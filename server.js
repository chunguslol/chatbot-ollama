const express = require("express");
const cors = require("cors");

async function fetchModule() {
    return (await import("node-fetch")).default;
}

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const OLLAMA_API = "http://127.0.0.1:11434/api/generate";

app.post("/api/generate", async (req, res) => {
    try {
        const fetch = await fetchModule(); // Import dinámico

        const response = await fetch(OLLAMA_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor proxy", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});
