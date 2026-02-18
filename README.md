# ClimaFresh - Sitio Web de Mantenimiento de Aire Acondicionado

Sitio web moderno y profesional diseñado para una empresa de servicios de climatización (HVAC). Construido con **Astro** y **Tailwind CSS** para garantizar el máximo rendimiento, velocidad y una experiencia de usuario fluida.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Terminado-success)
![Astro](https://img.shields.io/badge/Astro-5.0-orange)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-blue)

## ✨ Características Principales

*   **⚡ Rendimiento Extremo:** 
    *   Arquitectura "Astro Island" para hidratación selectiva.
    *   **Imágenes Optimizadas:** Assets comprimidos (AVIF) y redimensionados para carga instantánea.
    *   **Fuentes Locales:** Uso de Inter Variable (subseteada) con precarga (`preload`) para eliminar el retraso de renderizado.
    *   **Zero CSS Blocking:** Estilos inyectados directamente en el HTML (inlining) para un FCP ultra-rápido.
*   **📱 Diseño Responsivo:** Adaptado perfectamente a móviles con animaciones optimizadas para GPU (desactivadas en dispositivos de baja potencia).
*   **🔍 Optimizado para SEO:**
    *   Metodescripciones únicas por cada página.
    *   Etiquetas jerárquicas semánticamente correctas.
    *   Configuración automática de etiquetas meta y favicons.
*   **🎨 UI/UX Premium:**
    *   Transiciones suaves y animaciones de entrada.
*   **📄 Estructura Multi-Página:**
    *   Inicio, Servicios, Beneficios, Contacto, Cotizar y Páginas Legales.

## 🛠️ Tecnologías

*   **[Astro](https://astro.build/):** Framework web para sitios orientados a contenido.
*   **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilidades para el diseño.
*   **[pnpm](https://pnpm.io/):** Gestor de paquetes rápido y eficiente.
*   **TypeScript:** Para un código más robusto y mantenible.
*   **[Sharp](https://sharp.pixelplumbing.com/):** Procesamiento de imágenes de alto rendimiento.

## 🚀 Cómo empezar

### Prerrequisitos

Necesitas tener instalado **Node.js** y **pnpm**.

### Instalación

1.  Clona este repositorio (si aplica) o navega a la carpeta del proyecto.
2.  Instala las dependencias:

```bash
pnpm install
```

### Desarrollo Local

Para iniciar el servidor de desarrollo y ver el sitio en tiempo real:

```bash
pnpm dev
```

El sitio estará disponible en `http://localhost:4321`.

### Construcción para Producción

Para generar la versión estática optimizada lista para subir a tu hosting:

```bash
pnpm build
```

Los archivos generados estarán en la carpeta `dist/`.

## 📂 Estructura del Proyecto

```text
/
├── public/             # Archivos estáticos (imágenes, favicon, logos)
├── src/
│   ├── components/     # Componentes reutilizables (Header, Footer, Hero, etc.)
│   ├── layouts/        # Plantilla base del sitio (Layout.astro)
│   ├── pages/          # Rutas del sitio (index, servicios, contacto, etc.)
│   └── styles/         # Estilos globales CSS
└── package.json        # Dependencias y scripts
```

## 📝 Personalización

*   **Contenido:** Puedes editar los textos e imágenes directamente en los archivos `.astro` dentro de `src/components/` y `src/pages/`.
*   **Imágenes:** Las imágenes de marcas están en `public/images/brands/`. Las fotos de servicios usan enlaces de Unsplash, pero puedes reemplazarlas por archivos locales en `src/assets/` o `public/`.
*   **Colores:** La paleta de colores se gestiona a través de las clases de Tailwind (principalmente `blue-600` como color primario).

---

Desarrollado con ❤️ para .