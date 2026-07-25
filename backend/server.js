const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3000;

// Use memory storage so we don't clog up your directory with temporary images
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to parse JSON
app.use(express.json());

// Initialize the multimodal AI API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// The exact endpoint your frontend proxy is calling
app.post('/api/analyze-appliance', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided.' });
    }

    // Grab the language passed from the frontend (en, hi, kn, etc.)
    const targetLang = req.body.language || 'en';

    // Convert the Multer buffer directly to the base64 format Gemini expects
    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString('base64'),
        mimeType: req.file.mimetype,
      },
    };

    // Use gemini-1.5-flash for fast, multimodal vision tasks
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // The prompt instructing the AI what to do
    const prompt = `Identify the appliance or error code in this image. Provide a short, clear, 3-step repair or troubleshooting guide. You must output the final response in the ISO language code: ${targetLang}.`;

    // Send the prompt and the image together
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Send the AI's response back to the React frontend
    res.json({ solution: text });

  } catch (error) {
    console.error('AI Processing Error:', error);
    res.status(500).json({ error: 'Internal server error while processing the image.' });
  }
});

// Add this new endpoint to handle text translation
app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No text provided.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Prompt Gemini to act as a strict translator
    const prompt = `Translate the following text into the ISO language code '${targetLang}'. Only return the translated text, nothing else. No conversational filler. Text to translate: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({ translatedText: response.text().trim() });

  } catch (error) {
    console.error('Translation Error:', error);
    res.status(500).json({ error: 'Failed to translate text.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});