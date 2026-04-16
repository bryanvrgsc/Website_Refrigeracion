# Diseño: Galerías de Servicios con Imágenes AVIF

**Fecha:** 2026-04-16
**Estado:** Aprobado

## Resumen

Actualizar la sección de servicios para que cada modal muestre una galería de **5 imágenes** por servicio, todas en formato **AVIF**, con una dirección visual **mixta** entre fotografía industrial realista y escenas comerciales pulidas. Cada galería debe contar un **recorrido del servicio** de principio a fin, sin marcas ni texto visibles, reutilizando el modal actual y manteniendo la experiencia responsiva existente.

## Contexto

El sitio es un proyecto Astro + Tailwind CSS orientado a servicios industriales y de climatización. La sección de servicios actualmente:

- Renderiza los datos desde `src/data/services.ts`
- Resuelve las imágenes desde `src/assets/images/site/Servicios/*.avif`
- Muestra las galerías dentro del modal de `src/components/Services.astro`

Hoy cada servicio usa solo 3 imágenes, con nombres genéricos reutilizados entre distintas categorías. El cambio busca mejorar la claridad comercial del contenido y volver cada modal una galería narrativa, no solo una selección de fotos relacionadas.

## Requisitos

1. Cada uno de los 6 servicios debe tener **exactamente 5 imágenes** en su modal.
2. Todas las imágenes finales deben quedar en formato **`.avif`**.
3. Las imágenes deben ser **coherentes con el contenido del servicio** y contar un recorrido claro.
4. La dirección visual debe ser **mixta**:
   - 3 escenas con sensación de fotografía industrial o trabajo en campo.
   - 2 escenas más limpias y pulidas, tipo visual comercial/editorial.
5. Ninguna imagen debe mostrar:
   - marcas reconocibles
   - logotipos
   - texto visible
   - uniformes o equipos con branding legible
6. Se debe **mantener el modal actual** como patrón de interacción principal.
7. La integración debe conservar la carga actual basada en `import.meta.glob(...)` para AVIF.
8. La solución final debe seguir siendo adecuada para web en peso, proporción y consistencia visual.

## Enfoque Aprobado

Se implementará un enfoque **híbrido controlado**:

- Se conservarán imágenes actuales solo si ayudan realmente al recorrido narrativo del servicio.
- Se generarán o sustituirán escenas para completar cada secuencia hasta llegar a 5 imágenes útiles y coherentes.
- La prioridad es la claridad del servicio y la calidad visual final, no reutilizar assets por conveniencia.

Este enfoque equilibra:

- credibilidad de trabajo real
- acabado visual premium
- menor rigidez que un reemplazo total
- mejor narrativa que una galería tipo catálogo

## Narrativa Base de Cada Galería

Cada servicio seguirá la misma estructura de 5 pasos:

1. **Llegada / contexto**
   Técnico, equipo o entorno preparado para iniciar la intervención.
2. **Diagnóstico**
   Revisión técnica, inspección o toma de mediciones.
3. **Intervención principal**
   Acción central del servicio en ejecución.
4. **Detalle técnico**
   Close-up de componentes, herramientas, conexiones, limpieza o ajuste fino.
5. **Resultado**
   Sistema operando, espacio terminado o sensación clara de servicio completado.

## Secuencia por Servicio

### Mantenimiento Preventivo

1. Contexto del equipo a intervenir
2. Inspección inicial del sistema
3. Limpieza o mantenimiento activo
4. Detalle de componentes limpios o ajustados
5. Equipo estabilizado y listo para operar

### Reparación de Averías

1. Llegada ante una falla visible o revisión inicial
2. Diagnóstico de la avería
3. Reparación activa del componente o sistema
4. Detalle de la corrección técnica realizada
5. Equipo recuperado y en funcionamiento

### Suministro y Venta de Equipos

1. Presentación o preparación del equipo para entrega
2. Vista técnica del equipo seleccionado
3. Maniobra, preparación o resguardo para instalación/entrega
4. Detalle del producto o componentes clave
5. Equipo listo para instalar, entregar o poner en operación

### Instalación Profesional

1. Preparación del sitio
2. Montaje del sistema o unidad
3. Conexiones eléctricas, tubería o ductería
4. Detalle de acabados y ajuste técnico
5. Sistema funcionando correctamente

### Carga de Refrigerante

1. Contexto del sistema con revisión inicial
2. Diagnóstico de presión o estado del gas
3. Proceso de carga con herramienta especializada
4. Detalle de válvulas, conexiones o manómetros
5. Recuperación del rendimiento de enfriamiento

### Multiservicios

1. Contexto industrial o comercial del espacio a intervenir
2. Inicio de la intervención principal de infraestructura
3. Trabajo activo del oficio predominante
4. Detalle técnico del acabado o ajuste
5. Resultado general del espacio mantenido o rehabilitado

## Dirección Visual

La mezcla visual aprobada será consistente entre los 6 servicios:

- **Base realista:** escenas con luz natural o industrial, técnicos en acción, herramientas y contextos creíbles.
- **Refuerzo editorial:** algunas escenas más limpias, mejor compuestas y con acabado comercial para elevar la presentación del modal.

Restricciones visuales obligatorias:

- sin texto
- sin marcas visibles
- sin logotipos
- sin interfaces o pantallas con información legible
- sin composiciones repetidas dentro de la misma galería

Variedad mínima buscada por galería:

- 1 plano abierto o contextual
- 2 planos medios de trabajo
- 1 detalle técnico cercano
- 1 imagen de cierre o resultado

## Organización de Assets

Las imágenes finales vivirán en:

- `src/assets/images/site/Servicios/`

Se adoptará una convención de nombres explícita y estable:

- `<servicio>-01-contexto.avif`
- `<servicio>-02-diagnostico.avif`
- `<servicio>-03-intervencion.avif`
- `<servicio>-04-detalle.avif`
- `<servicio>-05-resultado.avif`

Ejemplo:

- `preventivo-01-contexto.avif`
- `preventivo-02-diagnostico.avif`
- `preventivo-03-intervencion.avif`
- `preventivo-04-detalle.avif`
- `preventivo-05-resultado.avif`

Esta convención reemplaza el uso de nombres genéricos compartidos entre distintos servicios y facilita el mantenimiento futuro del contenido.

## Integración Técnica

### Datos

`src/data/services.ts` será actualizado para que cada servicio:

- apunte a 5 archivos AVIF
- mantenga el orden narrativo aprobado
- deje de depender de imágenes genéricas cruzadas entre categorías

### Componente

`src/components/Services.astro` ya está preparado para consumir imágenes AVIF desde `import.meta.glob(...)` y mostrar una cuadrícula de 5 miniaturas:

- el contenedor actual del modal usa `grid-cols-5`
- no se requiere rediseño del modal para soportar 5 imágenes
- la navegación de miniaturas y flechas se conserva

La implementación debe priorizar cambios de contenido y wiring de assets, no un rediseño de UX.

## Flujo de Producción de Imágenes

El flujo previsto es:

1. Curar o generar candidatos visuales por servicio.
2. Seleccionar 5 escenas finales por cada uno de los 6 servicios.
3. Guardar los assets elegidos en el workspace con nombres definitivos.
4. Exportar o convertir cada imagen final a AVIF.
5. Actualizar `src/data/services.ts` para enlazar únicamente los archivos finales.
6. Verificar que Astro resuelva correctamente cada asset desde el glob actual.

## Riesgos a Controlar

1. **Artificialidad visible**
   Algunas imágenes pueden verse demasiado sintéticas o inconsistentes con el tono del sitio.
2. **Secuencias repetitivas**
   Dos o más imágenes podrían contar el mismo momento del recorrido.
3. **Desalineación con el servicio**
   Una escena puede ser técnicamente atractiva pero no explicar bien el servicio correcto.
4. **Inconsistencia de calidad**
   Diferencias grandes de iluminación, encuadre o detalle pueden romper la cohesión del modal.
5. **Peso excesivo**
   Si las imágenes finales no se controlan bien, el modal puede cargar más lento de lo deseado.

## Verificación

Antes de considerar completo el cambio se validarán estos puntos:

1. Cada servicio tiene **5 imágenes AVIF** enlazadas correctamente.
2. El modal abre y muestra las **5 miniaturas** sin errores.
3. La navegación por flechas y miniaturas mantiene el comportamiento esperado.
4. Cada secuencia cuenta claramente:
   - inicio
   - diagnóstico o preparación
   - intervención
   - detalle técnico
   - resultado
5. No hay marcas, texto ni elementos visuales conflictivos en los assets finales.
6. La mezcla entre realismo y pulido comercial se percibe consistente con el sitio.

## Archivos Afectados

| Archivo | Cambio |
|---|---|
| `src/assets/images/site/Servicios/*.avif` | Nuevos o reemplazados — assets finales por servicio |
| `src/data/services.ts` | Modificado — listas de imágenes por servicio y orden narrativo |
| `src/components/Services.astro` | Revisión de integración; cambios solo si se requieren ajustes menores para consumo o visualización |

## Criterios de Éxito

- Los 6 modals muestran galerías visualmente más sólidas y relevantes para el servicio.
- Cada servicio cuenta una historia de trabajo clara en 5 pasos.
- Todo el contenido final de galería queda en AVIF.
- La experiencia del modal se mantiene fluida y consistente en desktop y mobile.
- La estructura queda lista para futuras sustituciones de escenas sin ambigüedad en nombres o rutas.
