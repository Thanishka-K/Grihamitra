const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const translate = new Translate();

app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

// Health Check Route
app.get('/', (req, res) => {
    res.send("✅ Griha-Mitra API is up and running!");
});

// Path A: Voice Translation (Powered by Gemini)
app.post('/api/voice/translate', async (req, res) => {
    try {
        const { text, targetLang } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'No text provided' });
        }

        console.log(`Asking Gemini to translate to ${targetLang}: "${text}"`);

        // Use the same ultra-fast Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        // Strict prompt so Gemini ONLY returns the translation, without extra chatty text
        const prompt = `You are a highly accurate translator. Translate the following text into the language code '${targetLang}' (e.g., 'hi' for Hindi, 'kn' for Kannada, 'ta' for Tamil, 'te' for Telugu). Return ONLY the translated string. Do not include any quotes, markdown, or conversational filler.\n\nText: "${text}"`;

        const result = await model.generateContent(prompt);
        const translation = result.response.text().trim();
        
        console.log(`Translation result: ${translation}`);
        res.status(200).json({ translatedText: translation });

    } catch (error) {
        console.error("Translation Error:", error);
        res.status(500).json({ error: 'Failed to translate text' });
    }
});

// Path B: AI Appliance Guidance (Gemini 1.5 Flash)
app.post('/api/vision/analyze-appliance', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

        const imageBuffer = req.file.buffer;
        const mimeType = req.file.mimetype;
        
        console.log("Analyzing appliance image...");

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = "You are an AI assistant for domestic workers. Analyze this appliance image. Provide a simple, step-by-step guide (maximum 3 steps) on how to fix the error or use the machine. Keep each step short and clear.";

        const imageParts = [{
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType
            }
        }];

        const result = await model.generateContent([prompt, ...imageParts]);
        const responseText = result.response.text();
        
        // Split the response into clean list items
        const steps = responseText
            .split('\n')
            .map(line => line.replace(/^[\d.*-\s]+/, '').trim()) // Clean up numbers/bullets
            .filter(line => line.length > 0);

        console.log("Generated Steps:", steps);
        res.status(200).json(steps);
    } catch (error) {
        console.error("Vision Error:", error);
        res.status(500).json({ error: 'Failed to analyze appliance image' });
    }
});

app.listen(port, () => {
    console.log(`Griha-Mitra Backend running at http://localhost:${port}`);
});