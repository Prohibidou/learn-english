// Load environment variables
require('dotenv').config();

// Import required packages
const express = require('express');
const Groq = require('groq-sdk');
const cors = require('cors');

// --- Basic Setup ---
const app = express();
const port = 3001;

// --- Groq Client Initialization ---
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// --- API Endpoint ---
app.post('/api/chat', async (req, res) => {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "YOUR_GROQ_API_KEY") {
        return res.status(400).json({ error: 'Groq API key is not configured.' });
    }

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        console.log("Enviando mensaje a Groq:", prompt); 

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            // --- KEY CHANGE HERE ---
            // we will use Llama 3.3 Versatile is the ACTIVE model currently
            model: 'llama-3.3-70b-versatile', 
            // ------------------------
            temperature: 0.7,
            max_tokens: 150,
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content || 'Sorry, I couldn\'t get a response.';
        res.json({ response: aiResponse });

    } catch (error) {
        console.error('Error calling Groq API:', error);
        //sending the exact error to the front end to know what happend if it fails
        res.status(500).json({ error: error.message || 'Failed to get response from Groq API.' });
    }
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});