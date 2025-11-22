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

    const { prompt, products } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        console.log("Enviando mensaje a Groq:", prompt);

        // Create product list with English names and prices
        const productList = products ? products
            .reduce((acc, p) => {
                const englishName = p.name === 'Lechuga' ? 'Lettuce' :
                    p.name === 'Tomate' ? 'Tomato' :
                        p.name === 'Papas Lays' ? "Lay's Chips" : p.name;
                if (!acc.find(item => item.name === englishName)) {
                    acc.push({ name: englishName, price: p.price || 0 });
                }
                return acc;
            }, [])
            .map(p => `- ${p.name}: $${p.price.toFixed(2)}`)
            .join('\n') : '';

        // Enhanced system message for English learning cashier
        const systemMessage = {
            role: 'system',
            content: `You are a friendly and patient supermarket cashier who helps customers practice English. You MUST ALWAYS speak in English, even if the customer speaks Spanish.

🛒 AVAILABLE PRODUCTS IN STORE:
${productList}

📋 YOUR ROLE AS CASHIER:
1. Greet customers warmly and ask what they'd like to buy
2. When they mention products, ask "How many would you like?"
3. Keep track of their order and calculate the running total
4. Make friendly small talk (ask about their day, weekend plans, weather, hobbies, etc.)
5. When they're done shopping, provide the total and ask about payment method (cash, card, mobile payment)
6. Thank them and wish them a good day

✏️ YOUR ROLE AS ENGLISH TEACHER:
- If the customer makes a grammar mistake, gently correct it
- Show the correct form like: "I see you meant 'I want' instead of 'I wants'. That's great effort!"
- If they use Spanish words, teach them the English equivalent
- Praise good English usage
- Keep corrections friendly and encouraging
- Don't over-correct - focus on major errors

💬 CONVERSATION STYLE:
- Be natural and conversational
- Ask follow-up questions to keep the conversation going
- Use simple, clear English
- Be patient and supportive
- Make the learning experience fun and low-pressure

🎯 IMPORTANT RULES:
- ALWAYS respond in English, no matter what language they use
- Keep your responses concise (2-3 sentences max)
- Stay in character as a supermarket cashier
- Be encouraging about their English learning journey
- If they ask for a product not in the list, politely say it's out of stock

Remember: You're helping them practice real-world English in a shopping context!`
        };

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                systemMessage,
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