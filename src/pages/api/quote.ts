import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    const formspreeId = process.env.PUBLIC_FORMSPREE_QUOTE || process.env.FORMSPREE_QUOTE_ID;

    if (!formspreeId) {
        return new Response(JSON.stringify({
            error: "Server configuration error: Quote Form ID is missing."
        }), { status: 500 });
    }

    try {
        const data = await request.formData();

        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
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
            error: "Failed to connect to the form service."
        }), { status: 500 });
    }
}
