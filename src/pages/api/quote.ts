import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const formspreeId = import.meta.env.PUBLIC_FORMSPREE_QUOTE ||
        import.meta.env.FORMSPREE_QUOTE_ID ||
        process.env.PUBLIC_FORMSPREE_QUOTE ||
        process.env.FORMSPREE_QUOTE_ID;

    if (!formspreeId) {
        return new Response(JSON.stringify({
            error: "Server configuration error: Quote Form ID is missing."
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const data = await request.formData();
        const jsonBody: Record<string, any> = {};
        for (const [key, value] of data.entries()) {
            if (typeof value === 'string') {
                jsonBody[key] = value;
            }
        }

        // Handle multi-value fields like services[]
        const services = data.getAll('services[]');
        if (services.length > 0) {
            jsonBody['services'] = services.map(s => String(s));
        }

        if (!jsonBody.email) {
            return new Response(JSON.stringify({
                error: "Falta el campo de email."
            }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: 'POST',
            body: JSON.stringify(jsonBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify(responseData), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error submitting quote form:", error);
        return new Response(JSON.stringify({
            error: "Error interno del servidor al enviar el formulario.",
            details: error instanceof Error ? error.message : String(error)
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
