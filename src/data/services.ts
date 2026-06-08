export const services = [
    {
        id: 'preventivo',
        title: 'Mantenimiento Preventivo',
        description: 'Limpieza profunda y revisión general para evitar fallas y reducir consumo.',
        icon: 'shield-check',
        color: 'blue',
        details: [
            'Limpieza de serpentines con químicos biodegradables.',
            'Limpieza de charola de condensados y drenaje.',
            'Revisión de amperaje y voltaje en componentes.',
            'Lubricación de motores y rodamientos.',
            'Limpieza de filtros de aire y turbina.',
            'Aplicación de tratamiento antibacterial.'
        ],
        extra: [
            { label: 'Mantenimiento por Contrato', value: 'Planes anuales o semestrales para asegurar la continuidad operativa.' },
            { label: 'Equipos Industriales', value: 'Limpieza y ajuste a Compresores de Tornillo, Scroll y Reciprocantes (Atlas Copco, Kaeser, Gardner Denver, etc.).' },
            { label: 'Climatización', value: 'Revisión general de Chillers, Unidades Paquete, Aire Lavado y Mini Splits.' },
            { label: 'Lubricación', value: 'Cambio de aceites y filtros para equipos lubricados.' }
        ],
        media: [
            { type: 'video', src: 'preventivo-serpentin.mp4', poster: 'preventivo-serpentin-poster.avif' },
            { type: 'image', src: 'preventivo-01-contexto.avif' },
            { type: 'video', src: 'preventivo-limpieza.mp4', poster: 'preventivo-limpieza-poster.avif' },
            { type: 'image', src: 'preventivo-04-detalle.avif' },
            { type: 'image', src: 'preventivo-05-resultado.avif' }
        ],
        delay: '0'
    },
    {
        id: 'reparacion',
        title: 'Reparación de Averías',
        description: 'Diagnóstico preciso y reparación de cualquier tipo de falla técnica.',
        icon: 'wrench',
        color: 'orange',
        details: [
            'Diagnóstico de códigos de error en tarjeta.',
            'Reemplazo de capacitores y contactores.',
            'Cambio de compresores y motores.',
            'Reparación de fugas mediante soldadura.',
            'Corrección de problemas de vibración.'
        ],
        extra: [
            { label: 'Diagnóstico Especializado', value: 'Reparación de compresores que no arrancan, ruidos extraños o baja presión.' },
            { label: 'Marcas que atendemos', value: 'Sullair, Ingersoll-Rand, Chicago Pneumatic, Quincy y más.' },
            { label: 'Reemplazo de partes críticas', value: 'Cambio de contactores, tarjetas electrónicas, sellos y baleros.' },
            { label: 'Atención a Fugas', value: 'Detección y sellado en sistemas de refrigeración y aire comprimido.' }
        ],
        media: [
            { type: 'video', src: 'reparacion-soldadura.mp4', poster: 'reparacion-soldadura-poster.avif' },
            { type: 'image', src: 'reparacion-01-contexto.avif' },
            { type: 'image', src: 'reparacion-03-intervencion.avif' },
            { type: 'image', src: 'reparacion-04-detalle.avif' },
            { type: 'image', src: 'reparacion-05-resultado.avif' }
        ],
        delay: '100'
    },
    {
        id: 'venta',
        title: 'Suministro y Venta de Equipos',
        description: 'Venta de equipos de aire acondicionado y refrigeración de las mejores marcas.',
        icon: 'shopping-cart',
        color: 'indigo',
        details: [
            'Equipos Mini Split e Inverter.',
            'Unidades de Paquete y Divididos.',
            'Sistemas de Ventilación Industrial.',
            'Refacciones Originales.',
            'Asesoría técnica en selección de equipo.'
        ],
        extra: [
            { label: 'Venta de Equipos Nuevos', value: 'Compresores Industriales, Secadoras de Aire y Equipos de Aire Acondicionado.' },
            { label: 'Refacciones Originales', value: 'Filtros, bandas, termostatos y aceites especializados.' },
            { label: 'Asesoría Técnica', value: 'Le ayudamos a elegir el caballaje y capacidad correcta para su instalación.' }
        ],
        media: [
            { type: 'image', src: 'venta-azotea.avif' },
            { type: 'image', src: 'venta-02-diagnostico.avif' },
            { type: 'image', src: 'venta-04-detalle.avif' },
            { type: 'image', src: 'venta-05-resultado.avif' }
        ],
        delay: '150'
    },
    {
        id: 'instalacion',
        title: 'Instalación Profesional',
        description: 'Instalación de unidades nuevas con estándares de calidad y seguridad.',
        icon: 'plus-square',
        color: 'green',
        details: [
            'Cálculo térmico para capacidad (BTUs).',
            'Instalación estética de tuberías.',
            'Vacío del sistema con bomba (500 micrones).',
            'Conexión eléctrica normativa.',
            'Pruebas de arranque y capacitación.'
        ],
        extra: [
            { label: 'Sistemas HVAC', value: 'Instalación certificada de Mini Splits, Chillers y Cámaras de Refrigeración/Congelación.' },
            { label: 'Obra Civil Ligera', value: 'Instalación de Plafones (Falsos techos), muros de Tablaroca y adecuación de espacios para los equipos.' },
            { label: 'Ductería y Tubería', value: 'Instalación de líneas de cobre y aislamientos térmicos.' }
        ],
        media: [
            { type: 'video', src: 'instalacion-montaje.mp4', poster: 'instalacion-montaje-poster.avif' },
            { type: 'image', src: 'instalacion-01-contexto.avif' },
            { type: 'video', src: 'instalacion-tuberia.mp4', poster: 'instalacion-tuberia-poster.avif' },
            { type: 'image', src: 'instalacion-vacio.avif' },
            { type: 'image', src: 'instalacion-05-resultado.avif' }
        ],
        delay: '200'
    },
    {
        id: 'carga',
        title: 'Carga de Refrigerante',
        description: 'Recarga de gas para recuperar la máxima potencia de enfriamiento.',
        icon: 'droplets',
        color: 'cyan',
        details: [
            'Medición de presiones (Superheat/Subcooling).',
            'Detección de fugas con nitrógeno.',
            'Carga de gas R410A, R22 o R32.',
            'Verificación de temperaturas.',
            'Sellado de válvulas de servicio.'
        ],
        extra: [
            { label: 'Variedad de Gases', value: 'Manejo de R22, R404A, R407C, R410A y refrigerantes especiales.' },
            { label: 'Recuperación Ecológica', value: 'Procesos responsables para evitar daño al medio ambiente.' },
            { label: 'Optimización', value: 'Carga exacta para garantizar la eficiencia energética del equipo (que enfríe bien sin gastar luz de más).' }
        ],
        media: [
            { type: 'video', src: 'carga-manometros.mp4', poster: 'carga-manometros-poster.avif' },
            { type: 'image', src: 'carga-02-diagnostico.avif' },
            { type: 'video', src: 'carga-recarga.mp4', poster: 'carga-recarga-poster.avif' },
            { type: 'image', src: 'carga-04-detalle.avif' },
            { type: 'image', src: 'carga-05-resultado.avif' }
        ],
        delay: '300'
    },
    {
        id: 'multiservicios',
        title: 'Multiservicios',
        description: 'Soluciones integrales de mantenimiento para la infraestructura de su empresa.',
        icon: 'layers',
        color: 'slate',
        details: [
            'Mantenimiento a subestaciones eléctricas.',
            'Pintura y acabados industriales.',
            'Impermeabilización de naves.',
            'Herrería y estructuras metálicas.',
            'Plomería industrial y comercial.'
        ],
        extra: [
            { label: 'Electricidad Industrial', value: 'Media y baja tensión.' },
            { label: 'Plomería y Fontanería', value: 'Reparación de fugas, bombas y sistemas hidráulicos.' },
            { label: 'Acabados', value: 'Pintura en general, trabajos de Herrería, Aluminio y Carpintería.' },
            { label: 'Solución "Llave en Mano"', value: 'Un solo proveedor para mantener su planta u oficina en perfecto estado.' }
        ],
        media: [
            { type: 'video', src: 'multiservicios-electrico.mp4', poster: 'multiservicios-electrico-poster.avif' },
            { type: 'image', src: 'multiservicios-01-contexto.avif' },
            { type: 'image', src: 'multiservicios-03-intervencion.avif' },
            { type: 'image', src: 'multiservicios-04-detalle.avif' },
            { type: 'image', src: 'multiservicios-05-resultado.avif' }
        ],
        delay: '350'
    }
];
