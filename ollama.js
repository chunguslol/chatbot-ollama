async function generateText(prompt) {
    const fetch = (await import('node-fetch')).default;
    
    const url = "https://1843-189-28-64-131.ngrok-free.app";
    const data = {
        model: "phi4:14b",
        prompt: prompt,
        stream: false
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Respuesta:", result.response);
    } catch (error) {
        console.error("Error:", error);
    }
}

generateText("cuanto es 2+9");