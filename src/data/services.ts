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
        images: [
            "service-ac-main.avif",
            "service-maintenance.avif",
            "service-industrial.avif"
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
        images: [
            "service-installation.avif",
            "service-tech-1.avif",
            "service-repair.avif"
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
        images: [
            "service-repair.avif",
            "service-pizza.avif",
            "service-industrial.avif"
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
        images: [
            "service-ventilation.avif",
            "service-worker.avif",
            "service-hvac.avif"
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
        images: [
            "service-tech-2.avif",
            "service-ac-main.avif",
            "service-cooling.avif"
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
        images: [
            "service-electrical.avif",
            "service-compressor.avif",
            "service-repair.avif"
        ],
        delay: '350'
    }
];
