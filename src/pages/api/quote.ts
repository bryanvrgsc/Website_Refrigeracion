import type { APIRoute } from 'astro';

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
        // Convert FormData to a plain object, ensuring all values are strings for JSON serialization
        const jsonBody: Record<string, string | string[]> = {};
        for (const [key, value] of data.entries()) {
            if (typeof value === 'string') {
                jsonBody[key] = value;
            }
            // If there are multiple values for the same key (e.g., checkboxes with the same name),
            // FormData.getAll() is better, but Object.fromEntries only takes the last one.
            // The 'services[]' handling below addresses this for specific cases.
        }

        const services = data.getAll('services[]');
        if (services.length > 0) {
            // Ensure services are treated as strings if they are FormDataEntryValue
            jsonBody.services = services.map(s => String(s));
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
            error: "Failed to connect to the form service. Server backend error.",
            details: error instanceof Error ? error.message : String(error)
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
