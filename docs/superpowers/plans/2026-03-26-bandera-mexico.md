# Bandera de México Animada — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar un componente Astro de bandera mexicana con animación de ondeo CSS, posicionada en la esquina superior derecha del Hero sin romper el layout existente.

**Architecture:** Componente `MexicanFlag.astro` autocontenido (markup + keyframes CSS), posicionado con `position: absolute` dentro del `div relative` ya existente en la columna derecha de `Hero.astro`. Sin JS, sin hidratación.

**Tech Stack:** Astro, Tailwind CSS, CSS `@keyframes`, imagen PNG estática servida desde `public/`.

---

## File Map

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `public/images/mexico-flag.png` | Crear | Asset de imagen — bandera oficial con escudo nacional |
| `src/components/MexicanFlag.astro` | Crear | Componente: mástil + bandera + animación CSS |
| `src/components/Hero.astro` | Modificar | Importar y renderizar `<MexicanFlag />` en columna derecha |

---

## Task 1: Crear rama de desarrollo

**Files:**
- ninguno (git)

- [ ] **Step 1: Crear branch**

```bash
git checkout -b feat/mexico-flag-animation
```

Expected: `Switched to a new branch 'feat/mexico-flag-animation'`

- [ ] **Step 2: Verificar rama**

```bash
git branch
```

Expected: `* feat/mexico-flag-animation` marcada como activa.

---

## Task 2: Guardar imagen de la bandera como asset

**Files:**
- Crear: `public/images/mexico-flag.png`

- [ ] **Step 1: Crear directorio si no existe**

```bash
mkdir -p /Users/bryanvargas/Developer/multiservicios/public/images
```

- [ ] **Step 2: Copiar imagen de la bandera**

La imagen proporcionada por el usuario está en:
`/Users/bryanvargas/.claude/image-cache/ab80fc1a-8fa4-43c1-8f62-a740250e6c5f/1.png`

```bash
cp /Users/bryanvargas/.claude/image-cache/ab80fc1a-8fa4-43c1-8f62-a740250e6c5f/1.png \
   /Users/bryanvargas/Developer/multiservicios/public/images/mexico-flag.png
```

- [ ] **Step 3: Verificar que el archivo existe y tiene contenido**

```bash
ls -lh /Users/bryanvargas/Developer/multiservicios/public/images/mexico-flag.png
```

Expected: archivo visible con tamaño > 0.

- [ ] **Step 4: Commit**

```bash
git add public/images/mexico-flag.png
git commit -m "feat: add Mexico flag image asset"
```

---

## Task 3: Crear componente MexicanFlag.astro

**Files:**
- Crear: `src/components/MexicanFlag.astro`

Este componente es puramente decorativo: un mástil vertical + la imagen de la bandera con animación de ondeo CSS. Usa `position: absolute` y solo se muestra en `lg:` (desktop).

- [ ] **Step 1: Crear el archivo**

Crear `src/components/MexicanFlag.astro` con el siguiente contenido exacto:

```astro
---
---

<div
  class="absolute top-0 -right-4 lg:-right-20 z-20 hidden lg:flex items-start gap-1"
  aria-hidden="true"
>
  <!-- Mástil -->
  <div class="pole"></div>

  <!-- Bandera -->
  <img
    src="/images/mexico-flag.png"
    alt="Bandera de México"
    width="90"
    height="60"
    class="flag-wave"
    loading="lazy"
    decoding="async"
  />
</div>

<style>
  .pole {
    width: 3px;
    min-height: 80px;
    background: linear-gradient(to bottom, #c8a84b, #8b7355);
    border-radius: 2px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .flag-wave {
    width: 90px;
    height: auto;
    transform-origin: left center;
    animation: waveFlag 2.5s ease-in-out infinite;
    will-change: transform;
    display: block;
  }

  @keyframes waveFlag {
    0%   { transform: perspective(300px) rotateY(0deg)  skewY(-1deg); }
    25%  { transform: perspective(300px) rotateY(6deg)  skewY(1deg);  }
    50%  { transform: perspective(300px) rotateY(0deg)  skewY(-1deg); }
    75%  { transform: perspective(300px) rotateY(-4deg) skewY(0.5deg); }
    100% { transform: perspective(300px) rotateY(0deg)  skewY(-1deg); }
  }
</style>
```

- [ ] **Step 2: Verificar que el archivo tiene sintaxis válida inspeccionándolo**

```bash
cat src/components/MexicanFlag.astro
```

Expected: el contenido del archivo se muestra sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/MexicanFlag.astro
git commit -m "feat: add MexicanFlag animated component"
```

---

## Task 4: Integrar MexicanFlag en Hero.astro

**Files:**
- Modificar: `src/components/Hero.astro`

La bandera se inserta dentro del `div relative` de la columna derecha del Hero, que ya contiene los badges "Técnicos Certificados" y "Disponible Hoy". Al ser `absolute`, no desplaza ningún elemento existente.

- [ ] **Step 1: Leer Hero.astro para ubicar el punto de inserción exacto**

Leer `src/components/Hero.astro` y localizar esta línea (aproximadamente línea 109):

```astro
<div
  class="relative w-full max-w-[340px] sm:max-w-[450px] lg:max-w-[500px] animate-float-slow"
>
```

Este es el `div relative` padre que contiene todos los badges y la imagen. La bandera se inserta como **primer hijo** de este div.

- [ ] **Step 2: Agregar import en el frontmatter**

Agregar en el bloque `---` al inicio de `Hero.astro`, junto al import existente:

```astro
---
import { Image } from "astro:assets";
import heroTech from "../assets/images/site/Inicio/hero-tech.avif";
import MexicanFlag from "./MexicanFlag.astro";
---
```

- [ ] **Step 3: Insertar el componente dentro del div relative**

Dentro de:
```astro
<div
  class="relative w-full max-w-[340px] sm:max-w-[450px] lg:max-w-[500px] animate-float-slow"
>
```

Agregar `<MexicanFlag />` como primer hijo, antes del `div` de la imagen:

```astro
<div
  class="relative w-full max-w-[340px] sm:max-w-[450px] lg:max-w-[500px] animate-float-slow"
>
  <MexicanFlag />

  <div
    class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 transform lg:rotate-2 hover:rotate-0 transition-all duration-700 group"
  >
  <!-- ... resto del código sin cambios ... -->
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: integrate MexicanFlag into Hero section"
```

---

## Task 5: Verificar build y comportamiento visual

**Files:**
- ninguno (verificación)

- [ ] **Step 1: Arrancar servidor de desarrollo**

```bash
pnpm dev
```

Expected: servidor corriendo en `http://localhost:4321` (o el puerto que muestre la terminal) sin errores de compilación.

- [ ] **Step 2: Abrir el sitio y verificar visualmente**

Abrir `http://localhost:4321` en el navegador y confirmar:

1. La bandera aparece en la esquina superior derecha del Hero, visible en desktop (ancho ≥ 1024px).
2. La animación ondea de izquierda a derecha continuamente.
3. El badge "Disponible Hoy" sigue en su posición original.
4. El badge "Técnicos Certificados" sigue en su posición original.
5. El botón "Cotizar Proyecto" del header no está tapado.
6. En mobile (< 1024px), la bandera **no es visible**.

- [ ] **Step 3: Verificar build de producción sin errores**

```bash
pnpm build
```

Expected: build completo sin errores ni warnings relacionados con `MexicanFlag`.

- [ ] **Step 4: Commit final y push de la rama**

```bash
git add -A
git status
# Verificar que no hay archivos inesperados staged
git push -u origin feat/mexico-flag-animation
```

Expected: rama publicada en origin, lista para Pull Request.

---

## Criterios de éxito

- [ ] La bandera ondea visualmente de izquierda a derecha en desktop.
- [ ] Ningún elemento del layout existente se desplazó.
- [ ] En mobile (< `lg`) la bandera no es visible.
- [ ] No hay JS hidratado (`client:*`).
- [ ] `pnpm build` pasa sin errores.
- [ ] La rama `feat/mexico-flag-animation` está en origin lista para PR.
