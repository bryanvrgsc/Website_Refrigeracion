import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    const formspreeId = import.meta.env.PUBLIC_FORMSPREE_CONTACT ||
        import.meta.env.FORMSPREE_CONTACT_ID ||
        process.env.PUBLIC_FORMSPREE_CONTACT ||
        process.env.FORMSPREE_CONTACT_ID;

    if (!formspreeId) {
        return new Response(JSON.stringify({
            error: "Server configuration error: Contact Form ID is missing."
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const data = await request.formData();
        const jsonBody: Record<string, any> = Object.fromEntries(data.entries());

        // Add multiple checkbox support if needed here (for Quote but safe for all)
        const services = data.getAll('services[]');
        if (services.length > 0) {
            jsonBody.services = services;
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
        console.error("Error submitting contact form:", error);
        return new Response(JSON.stringify({
            error: "Failed to connect to the form service. Server backend error.",
            details: error instanceof Error ? error.message : String(error)
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
