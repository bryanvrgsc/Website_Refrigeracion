# Galerías de servicios con media real (foto + video AV1)

Fecha: 2026-06-08

## Objetivo

Reemplazar imágenes stock de las galerías de servicios por el contenido real
(fotos y videos de WhatsApp del cliente), con los videos **reproducibles** en la
galería, codificados en **AV1**. Eliminar toda imagen que quede sin uso.

## Inventario de assets reales

- **8 videos únicos** (el clip `04.26.18` y `04.00.22` son idénticos → se descarta el duplicado).
- **2 fotos**.

| Origen | Contenido | Nombre nuevo |
|--------|-----------|--------------|
| Video 04.26.18 | manómetros en condensadora | `carga-manometros.mp4` |
| Video 04.28.32 | condensadora Freyvell cargando | `carga-recarga.mp4` |
| Video 04.32.24 | limpieza mini-split interior | `preventivo-limpieza.mp4` |
| Video 04.25.29 | lavado de serpentín exterior | `preventivo-serpentin.mp4` |
| Video 04.10.49 | soldadura en compresor | `reparacion-soldadura.mp4` |
| Video 04.42.18 | tubería de cobre en pared | `instalacion-tuberia.mp4` |
| Video 04.14.16 | montaje mini-split (escalera) | `instalacion-montaje.mp4` |
| Video 03.49.11 | cuarto eléctrico / racks | `multiservicios-electrico.mp4` |
| Foto 0417 | técnico en azotea con condensadoras | `venta-azotea.avif` |
| Foto 0420 | bomba de vacío Yellow Jacket | `instalacion-vacio.avif` |

Cada video genera su **poster `.avif`** (frame extraído) con el sufijo `-poster.avif`.

## Mapeo por galería (5 items; el primero es la portada de la card)

| Servicio | 1 (portada) | 2 | 3 | 4 | 5 |
|----------|-------------|---|---|---|---|
| Preventivo | `preventivo-serpentin` (V) | `preventivo-01-contexto` | `preventivo-limpieza` (V) | `preventivo-04-detalle` | `preventivo-05-resultado` |
| Reparación | `reparacion-soldadura` (V) | `reparacion-01-contexto` | `reparacion-03-intervencion` | `reparacion-04-detalle` | `reparacion-05-resultado` |
| Venta | `venta-azotea` (P) | `venta-02-diagnostico` | `venta-03-intervencion` | `venta-04-detalle` | `venta-05-resultado` |
| Instalación | `instalacion-montaje` (V) | `instalacion-01-contexto` | `instalacion-tuberia` (V) | `instalacion-vacio` (P) | `instalacion-05-resultado` |
| Carga | `carga-manometros` (V) | `carga-02-diagnostico` | `carga-recarga` (V) | `carga-04-detalle` | `carga-05-resultado` |
| Multiservicios | `multiservicios-electrico` (V) | `multiservicios-01-contexto` | `multiservicios-03-intervencion` | `multiservicios-04-detalle` | `multiservicios-05-resultado` |

(V) = video, (P) = foto real, resto = avif stock conservado.

## Encode AV1

SVT-AV1 `-preset 6 -crf 38`, audio AAC 96k, `-movflags +faststart`, manteniendo
848×480. Objetivo: ~1–1.5 MB por clip (origen 3–5 MB). Se borran los `.mp4`
originales de WhatsApp y el duplicado.

## Modelo de datos (`src/data/services.ts`)

Cambiar `images: string[]` por:

```ts
media: Array<{ type: 'image' | 'video'; src: string; poster?: string }>
```

`src` y `poster` son nombres de archivo dentro de `Servicios/`.

## Render (`src/components/Services.astro`)

- Añadir glob de `*.mp4` (resuelto a URL) junto al de `*.avif`.
- Resolver cada item de `media` a `{ type, src, poster }` con URLs reales.
- **Card portada** (item 0): si es video, `<video muted loop playsinline preload="metadata" poster>`
  con autoplay al hover (pausa al salir) y badge ▶; si es imagen, `<img>`.
- **Thumbnails** (items 1–3): usar poster (video) o imagen, con ícono play overlay en videos.
- **Badge**: "5 fotos" → conteo dinámico "N fotos · M videos".
- **Modal**: viewport principal renderiza `<video controls>` o `<img>` según el item activo;
  thumbnails con ícono play en videos; contador `x / total`.
- **Zoom**: solo para imágenes (los videos no abren zoom).

## Limpieza

Borrar toda `.avif` en `Servicios/` que no quede referenciada tras el rework:
los 13 `service-*.avif` (huérfanos) y los frames stock no usados (varios `*-02`,
`*-03`, `carga-01`, `venta-01`, etc.).

## Verificación

`npx astro build` sin errores de import; revisión visual de cards y modal con
reproducción de video.
