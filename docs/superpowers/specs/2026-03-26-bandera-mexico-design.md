# Diseño: Animación Bandera de México

**Fecha:** 2026-03-26
**Estado:** Aprobado

## Resumen

Agregar un componente de bandera mexicana animada (ondeo de izquierda a derecha) posicionada en la esquina superior derecha del Hero, entre el header y el badge "Disponible Hoy", sin afectar el layout existente.

## Contexto

El sitio es un proyecto Astro + Tailwind CSS para una empresa mexicana de servicios industriales (aire acondicionado y mantenimiento industrial). La identidad nacional refuerza la propuesta de valor local.

## Requisitos

1. La bandera muestra el diseño oficial de México con el escudo nacional completo (águila, nopal, serpiente, laurel).
2. La animación simula ondeo de izquierda a derecha, como si hubiera viento.
3. Posición: esquina superior derecha del Hero, debajo del botón "Cotizar Proyecto" del header y arriba del badge "Disponible Hoy".
4. No tapa ningún botón ni elemento interactivo existente.
5. No modifica el layout actual del Hero ni de ningún otro componente.
6. Solo visible en desktop (`lg:` breakpoint en adelante). Oculta en mobile para no interferir con el menú hamburger.

## Arquitectura

### Archivo de imagen

- **Ruta:** `public/images/mexico-flag.png`
- La imagen del usuario (bandera oficial con escudo nacional) se copia a `public/` para servirse como asset estático, sin pasar por el pipeline de optimización de Astro Images (no aplica `<Image>` ya que es decorativa y no crítica para LCP).

### Componente

- **Ruta:** `src/components/MexicanFlag.astro`
- Autocontenido: incluye markup + `<style>` con `@keyframes`.
- Sin JavaScript, sin dependencias externas.

**Estructura del markup:**

```
<div class="absolute top-0 right-0 z-20 hidden lg:flex items-start gap-1">
  <!-- Mástil -->
  <div class="pole" />
  <!-- Tela de la bandera -->
  <img src="/images/mexico-flag.png" alt="Bandera de México" class="flag-wave" />
</div>
```

### Integración en Hero.astro

Se inserta `<MexicanFlag />` dentro del `div relative` existente de la columna derecha (el que contiene la imagen del técnico y los badges). Al usar `position: absolute`, no genera ningún flujo de documento que desplace elementos.

**Posición CSS:**
- `top: 0` — arriba del contenedor de imagen
- `right: -4px` mobile / `right: -80px` (lg) — alineado con el badge "Disponible Hoy" existente (`-right-4 lg:-right-20`)

### Animación

```css
@keyframes waveFlag {
  0%   { transform: perspective(300px) rotateY(0deg) skewY(-1deg); }
  25%  { transform: perspective(300px) rotateY(6deg)  skewY(1deg); }
  50%  { transform: perspective(300px) rotateY(0deg)  skewY(-1deg); }
  75%  { transform: perspective(300px) rotateY(-4deg) skewY(0.5deg); }
  100% { transform: perspective(300px) rotateY(0deg)  skewY(-1deg); }
}

.flag-wave {
  width: 90px;
  height: auto;
  transform-origin: left center;
  animation: waveFlag 2.5s ease-in-out infinite;
  will-change: transform;
}
```

**Mástil:**
```css
.pole {
  width: 3px;
  height: 80px;
  background: linear-gradient(to bottom, #c0a060, #8B7355);
  border-radius: 2px;
  margin-top: 2px;
}
```

## Tamaño

- Bandera: `width: 90px`, altura proporcional (~58px para proporción 3:2 oficial).
- Mástil: `3px × 80px`.

## Accesibilidad

- `alt="Bandera de México"` en el `<img>`.
- `aria-hidden="true"` en el contenedor (es decorativo, no interactivo).

## Archivos afectados

| Archivo | Cambio |
|---|---|
| `public/images/mexico-flag.png` | Nuevo — imagen de la bandera |
| `src/components/MexicanFlag.astro` | Nuevo — componente con animación |
| `src/components/Hero.astro` | Modificado — importar y renderizar `<MexicanFlag />` |

## Criterios de éxito

- La bandera ondea visualmente de izquierda a derecha en desktop.
- Al inspeccionar el DOM, ningún elemento previo cambió de posición.
- En mobile (< `lg`) el componente no es visible.
- No hay JS hidratado (`client:*`).
- Performance: animación usa solo `transform` (compositor thread, 60fps).
