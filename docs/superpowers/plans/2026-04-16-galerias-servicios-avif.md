# Galerías de Servicios AVIF Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar cada modal de servicio con 5 imágenes AVIF narrativas, con assets reproducibles desde un script local y referencias actualizadas en los datos del sitio.

**Architecture:** Se agregará un manifiesto de imágenes curadas y un script de build que descargue o reutilice fuentes locales, las procese con `sharp` y genere archivos AVIF con nombres estables por servicio. Luego se actualizará `src/data/services.ts` para apuntar a esas 30 salidas y se verificará con una prueba automatizada que el dataset y los archivos finales estén en sync.

**Tech Stack:** Node.js, `sharp`, Astro, TypeScript data module, Node test runner (`node --test`).

---

## File Map

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `tests/service-gallery-assets.test.mjs` | Crear | Verificar que cada servicio tenga 5 imágenes `.avif` existentes y con convención estable |
| `scripts/build-service-galleries.mjs` | Crear | Descargar/procesar imágenes fuente y exportar 30 AVIF finales |
| `scripts/service-gallery-manifest.mjs` | Crear | Declarar fuentes, salidas, nombres y transformaciones |
| `src/data/services.ts` | Modificar | Reemplazar listas antiguas por 5 archivos AVIF por servicio |
| `package.json` | Modificar | Exponer script reproducible para regenerar galerías |
| `src/assets/images/site/Servicios/*.avif` | Generar | Assets finales enlazados por la UI |

---

### Task 1: Crear la prueba roja del dataset

**Files:**
- Create: `tests/service-gallery-assets.test.mjs`
- Test: `tests/service-gallery-assets.test.mjs`

- [ ] **Step 1: Escribir una prueba que falle con el estado actual**

Crear una prueba que:
- importe `src/data/services.ts` con `node --experimental-strip-types`
- valide que existen 6 servicios
- valide que cada servicio tenga exactamente 5 imágenes
- valide que cada nombre termine en `.avif`
- valide que cada nombre empiece con el prefijo del servicio (`preventivo-`, `reparacion-`, etc.)
- valide que el archivo exista físicamente en `src/assets/images/site/Servicios/`

- [ ] **Step 2: Ejecutar la prueba y confirmar el fallo esperado**

Run:

```bash
node --test tests/service-gallery-assets.test.mjs
```

Expected:
- FAIL porque hoy cada servicio tiene 3 imágenes y usa nombres genéricos.

---

### Task 2: Crear el manifiesto y el script de generación

**Files:**
- Create: `scripts/service-gallery-manifest.mjs`
- Create: `scripts/build-service-galleries.mjs`
- Modify: `package.json`

- [ ] **Step 1: Declarar un manifiesto con fuentes remotas/locales y 30 salidas**

El manifiesto debe separar:
- `sources`: URLs remotas o paths locales
- `outputs`: archivo destino, fuente asociada, servicio, paso narrativo y transformaciones

- [ ] **Step 2: Implementar el script de generación**

El script debe:
- crear directorios temporales y destino si no existen
- descargar solo fuentes remotas faltantes
- abrir cada fuente con `sharp`
- aplicar recortes/resize/ajustes mínimos para limpiar branding o encuadre
- exportar cada salida a `.avif`
- mantener nombres finales estables en `src/assets/images/site/Servicios/`

- [ ] **Step 3: Agregar script npm reproducible**

Agregar en `package.json`:

```json
"build:service-galleries": "node scripts/build-service-galleries.mjs"
```

---

### Task 3: Generar los AVIF finales

**Files:**
- Generate: `src/assets/images/site/Servicios/*.avif`

- [ ] **Step 1: Ejecutar el builder de galerías**

Run:

```bash
pnpm build:service-galleries
```

Expected:
- Se generan 30 archivos `.avif` nuevos con nombres por servicio y paso narrativo.

- [ ] **Step 2: Inspeccionar el directorio de salida**

Run:

```bash
find src/assets/images/site/Servicios -maxdepth 1 -type f | sort
```

Expected:
- aparecen los nuevos nombres `preventivo-*`, `reparacion-*`, `venta-*`, `instalacion-*`, `carga-*`, `multiservicios-*`

---

### Task 4: Actualizar el dataset del sitio

**Files:**
- Modify: `src/data/services.ts`

- [ ] **Step 1: Reemplazar las listas antiguas**

Cada servicio debe apuntar a 5 archivos finales ordenados así:
- contexto
- diagnostico
- intervencion
- detalle
- resultado

- [ ] **Step 2: Mantener el resto del contenido intacto**

No tocar:
- `id`
- `title`
- `description`
- `details`
- `extra`

Salvo que sea estrictamente necesario para alinearlo con la nueva galería.

---

### Task 5: Llevar la prueba a verde y verificar integración

**Files:**
- Test: `tests/service-gallery-assets.test.mjs`
- Test: `src/data/services.ts`

- [ ] **Step 1: Re-ejecutar la prueba del dataset**

Run:

```bash
node --test tests/service-gallery-assets.test.mjs
```

Expected:
- PASS

- [ ] **Step 2: Verificar build del sitio**

Run:

```bash
pnpm build
```

Expected:
- build exitoso sin errores de assets faltantes

- [ ] **Step 3: Crear una hoja de contacto para revisión visual rápida**

Generar una imagen temporal con miniaturas de los nuevos AVIF para revisar que cada servicio tenga 5 escenas razonables y que no queden logos/texto dominantes.

---

### Task 6: Cierre de implementación

**Files:**
- Review only

- [ ] **Step 1: Confirmar cobertura contra la spec**

Revisar que se cumpla:
- 5 imágenes por servicio
- todas en AVIF
- secuencia narrativa por servicio
- mezcla visual coherente
- modal sin cambios estructurales innecesarios

- [ ] **Step 2: Resumir cambios y riesgos residuales**

Documentar si quedó alguna imagen con contenido cercano al límite de branding o alguna repetición visual aceptable pero no ideal.
