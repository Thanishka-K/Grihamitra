# Griha-Mitra Frontend

The frontend user interface for **Griha-Mitra**, a companion web application designed to empower domestic workers with multilingual voice translation, AI-powered appliance repair guides, and a daily task ledger. Built with **React**, **Vite**, and **Tailwind CSS**.

---

## 📂 Folder Structure

```text
frontend/
├── public/                # Static assets and icons
├── src/
│   ├── assets/            # Images and branding files
│   ├── components/        # Reusable UI building blocks (BottomNav, Camera, etc.)
│   ├── context/           # React context for global state management (LanguageContext)
│   ├── services/          # API integration services
│   ├── views/             # Main screen components
│   │   ├── ApplianceView.jsx  # AI appliance diagnosis & Markdown repair guide
│   │   ├── HomeView.jsx       # Dashboard and language selector
│   │   ├── LedgerView.jsx     # Daily work progress tracker with voice input
│   │   └── TranslatorView.jsx # Real-time speech-to-text walkie-talkie mode
│   ├── App.css            # Custom application styles
│   ├── App.jsx            # Main application layout and routing
│   ├── index.css          # Tailwind CSS directives and Neo-brutalist custom styles
│   ├── main.jsx           # Application entry point
│   └── translations.js    # Multi-language dictionaries (EN, HI, BN, TE, KN, TA, ML)
├── .gitignore
├── eslint.config.js
├── index.html             # Main HTML entry point with FontAwesome icons
├── package.json
└── vite.config.js         # Vite configuration with proxy rules
```
🚀 Getting Started & Execution
Prerequisites
Make sure you have Node.js installed on your machine. You will also need to have the backend server running concurrently to handle AI requests and translations.

### 1. Install Dependencies
Open your terminal, navigate to the frontend folder, and install the required packages:

```Bash commands:
cd frontend
npm install
```
### 2. Configure the Vite Proxy
The frontend communicates with the Node.js backend via a configured proxy in vite.config.js pointing to http://localhost:3000. Ensure your backend server is active on port 3000.

### 3. Run the Development Server
Start the Vite development server:

```Bash commands:
npm run dev
```
Open your browser and navigate to http://localhost:5173 to view the application.

### 💡 Key Features
* Multi-Language Support: Seamlessly switch between English, Hindi, Bengali, Telugu, Kannada, Tamil, and Malayalam.
* AI Appliance Diagnosis: Upload a photo of an appliance error to receive instant, formatted troubleshooting steps powered by Google Gemini.
* Walkie-Talkie Voice Translator: Real-time speech recognition and text-to-speech cross-translation for smooth communication.
* Interactive Work Ledger: Track daily progress with checkboxes, voice-to-text task input, and dynamic language sync.
