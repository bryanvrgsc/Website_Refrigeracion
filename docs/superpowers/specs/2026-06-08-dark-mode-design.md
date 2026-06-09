# Dark Mode — Diseño

Fecha: 2026-06-08
Branch base: `feat/galerias-media-real-av1`

## Objetivo

Agregar modo oscuro al sitio (Astro + Tailwind v4) con un botón flotante
abajo-derecha que cicla tres estados (sistema, claro, oscuro) y muestra el modo
activo. Todos los elementos deben adaptarse correctamente, incluyendo el
logotipo SVG.

## Estado actual

- Stack: Astro 6, Tailwind v4, React 19 (islas puntuales).
- `src/styles/global.css`: tema con `--color-primary` (blue-600),
  `--color-secondary` (cyan-500); base body `bg-slate-50/30 text-slate-900`.
- Cero uso de variante `dark:` hoy. 17 archivos usan colores claros fijos
  (`slate-*`, `bg-white`, `text-white`, `gray-*`).
- Logo `public/favicon.svg` cargado como `<img>` en `Header.astro` (CSS no puede
  estilizar paths internos). Wordmark inferior usa `.st0` negro (#060606) →
  invisible sobre fondo oscuro. Azul `.st2` y blanco `.st1` quedan bien.
- `Layout.astro` usa `<ClientRouter />` (view transitions) → el tema debe
  persistir entre navegaciones y no parpadear (FOUC).

## Decisiones

1. **Color**: tokens semánticos (variables CSS) en lugar de `dark:` por elemento.
2. **Logo**: swap de dos archivos SVG (`favicon.svg` claro, `favicon-dark.svg`
   oscuro) según el tema.
3. **Botón**: icono que cambia (monitor/sol/luna), cicla al hacer click.

## 1. Sistema de temas

- Tres estados: `system` (default), `light`, `dark`.
- Persistencia en `localStorage`, clave `theme` (valores: `system|light|dark`).
- Estado efectivo:
  - `light` / `dark` → fuerzan.
  - `system` → sigue `window.matchMedia('(prefers-color-scheme: dark)')`, con
    listener para cambios en vivo del SO.
- Aplicación: clase `.dark` en `<html>` cuando el estado efectivo es oscuro.
- Tailwind v4 — habilitar variante por clase en `global.css`:
  ```css
  @custom-variant dark (&:where(.dark, .dark *));
  ```
- Helper compartido (script inline, sin import de módulo para no romper el
  pre-paint): funciones `getStored()`, `resolveEffective(stored)`,
  `applyTheme(stored)` que setea/quita `.dark`, fija el src del logo y emite un
  `CustomEvent('themechange', { detail })` para que el botón actualice su icono.

## 2. Tokens semánticos

En `src/styles/global.css`:

```css
@layer base {
  :root {
    --bg: var(--color-white);
    --surface: var(--color-white);
    --fg: var(--color-slate-900);
    --muted: var(--color-slate-600);
    --border: var(--color-slate-200);
  }
  .dark {
    --bg: var(--color-slate-950);
    --surface: var(--color-slate-900);
    --fg: var(--color-slate-100);
    --muted: var(--color-slate-400);
    --border: var(--color-slate-800);
  }
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-border: var(--border);
}
```

- Genera utilidades: `bg-bg`, `bg-surface`, `text-fg`, `text-muted`,
  `border-border` (y modificadores de opacidad vía `color-mix`, p. ej.
  `bg-surface/70`).
- Body base pasa a `bg-bg text-fg`.
- Acentos de marca (azul/cyan) se conservan. Donde el contraste sobre fondo
  oscuro lo requiera, usar `dark:` puntual para subir a `blue-400`/`cyan-400`.
- `.glass`: reescribir a `bg-surface/70 backdrop-blur-xl border-border/40
  shadow-sm` para que sirva en ambos modos.
- Patrones `.grid-pattern` / `.dot-pattern`: el color de puntos (slate-200/300)
  pasa a una var (`--pattern-dot`) con valor más tenue en `.dark`.
- Scrollbar (`::-webkit-scrollbar-*`) y `selection`: versión oscura vía tokens
  o `dark:`.

## 3. Sin flash (FOUC)

- Script `is:inline` en `<head>` de `Layout.astro`, **antes** del `<body>`:
  lee `localStorage` + `matchMedia`, agrega `.dark` a `<html>` si corresponde.
  Debe correr síncrono antes del primer paint.
- El logo se ajusta tras montar el `<img>`; el script `applyTheme` fija el src
  correcto en `astro:page-load` y en `astro:after-swap`.
- ClientRouter: reaplicar el tema en `document.addEventListener('astro:after-swap', ...)`
  para mantener `.dark` tras cada navegación cliente.
- `<meta name="color-scheme">` o `color-scheme: light dark` en `:root` para que
  controles nativos (formularios, scrollbar) acompañen.

## 4. Logo (swap dos archivos)

- Crear `public/favicon-dark.svg` a partir de `favicon.svg`: cambiar el fill de
  `.st0` (#060606 → slate-100 `#f1f5f9`). `.st1` (blanco) y `.st2` (azul) sin
  cambios.
- En `Header.astro`, dar `id="brand-logo"` al `<img>` y `data-logo-light` /
  `data-logo-dark` con las rutas (o resolverlas en el helper).
- `applyTheme` fija `img.src` según modo efectivo. El src inicial lo decide el
  helper en `astro:page-load`; default seguro = claro para no romper SSR.
- `<link rel="icon">` del head se deja en `favicon.svg` (chrome del navegador,
  fuera de alcance).

## 5. Botón flotante — `ThemeToggle.astro`

- Nuevo componente `src/components/ThemeToggle.astro`, inyectado una vez en
  `Layout.astro` (aplica a todas las páginas).
- `position: fixed`, abajo-derecha (`bottom-5 right-5`), circular, estilo
  `glass`, `z-50`, `active:scale-95`, respeta safe-area en móvil.
- Tres SVG inline (monitor=sistema, sol=claro, luna=oscuro); se muestra el del
  estado **guardado** (no el efectivo) para reflejar la elección del usuario.
- Click cicla: `system → light → dark → system`. Persiste y llama `applyTheme`.
- Escucha `themechange` para re-renderizar el icono.
- `aria-label` dinámico ("Tema: Sistema/Claro/Oscuro") + `title` tooltip.
- Re-bind idempotente en `astro:page-load` (patrón ya usado en `Header.astro`).

## 6. Ajustes por componente

Sustituir colores fijos por tokens en los archivos afectados (17):

- `Layout.astro`: body `bg-white text-slate-900` → `bg-bg text-fg`; bloque
  `<style is:global>` y scrollbar.
- `Header.astro`: estado scroll (`glass`, borders), texto marca, menú móvil
  (`bg-white`, `text-gray-*`, divisores), botón hamburguesa.
- `Footer.astro`, `Hero.astro`, `Services.astro`, `Benefits.astro`,
  `Brands.astro`, `Clients.astro`, `Suppliers.astro`, `Contact.astro`,
  `Quote.astro`, `Welcome.astro`, `MexicanFlag.astro` y páginas en `src/pages/*`
  que declaren colores claros fijos.
- Regla: fondos → `bg-bg`/`bg-surface`; texto principal → `text-fg`; secundario
  → `text-muted`; bordes → `border-border`; acentos de marca intactos.
- Imágenes/AVIF y logos de marca (SVG de terceros) no se tocan; si algún SVG de
  marca queda con bajo contraste en dark, envolver en contenedor con leve fondo
  claro vía `dark:bg-white/5` (caso por caso, no global).

## Testing / verificación

- Manual en `astro dev`: alternar los 3 modos; verificar que persiste tras
  recargar y tras navegar (ClientRouter) sin flash.
- Forzar `prefers-color-scheme` del SO y comprobar que `system` reacciona en
  vivo.
- Revisar contraste (texto, bordes, glass, patrones) en cada página.
- Verificar logo correcto en ambos modos y sin parpadeo al cargar/navegar.
- Sin errores de consola; `astro build` limpio.

## Fuera de alcance

- Rediseño de paleta de marca.
- Temas adicionales (alto contraste, sepia).
- Favicon del navegador adaptativo (link rel=icon).
```
