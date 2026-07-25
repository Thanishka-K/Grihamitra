# Griha-Mitra Backend 🚀

The Node.js and Express backend server for **Griha-Mitra**. This server acts as the secure middleware bridging the React frontend to the Google Gemini API, handling multimodal appliance image diagnosis and real-time cross-language translation.

---

## 📂 Folder Structure

```text
backend/
├── .env.example       # Template for required environment variables
├── package.json       # Project dependencies and scripts
├── README.md          # Backend documentation
└── server.js          # Express server with Gemini AI endpoints
```

## ⚙️ Setup & Execution
Prerequisites
Make sure you have Node.js installed on your system.

### 1. Install Dependencies
Open your terminal, navigate to the backend folder, and install the necessary packages (express, multer, @google/generative-ai, dotenv, and cors if applicable):

```Bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a .env file in the root of the backend folder (you can use .env.example as a template) and add your Gemini API key:

```Code snippet
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Start the Server
Start the Express server using Node:

```Bash
node server.js
```

The server will boot up and run on http://localhost:3000.

### 🔌 API Endpoints
* POST /api/analyze-appliance
Description: Accepts a multipart form-data image upload and a target language. Uses Gemini multimodal vision to detect appliance errors and return formatted troubleshooting guides.

* POST /api/translate
Description: Accepts JSON text and a target ISO language code. Uses Gemini text generation to provide clean, real-time cross-language translations for the Walkie-Talkie interface.
