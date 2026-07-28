# <div align="center">गृह-मित्र (GRIHA-MITRA) 🇮🇳</div>
<div align="center">
  <b>Empowering Domestic Workers & Households Through Multilingual Accessibility & AI Innovation </b>
  <br>Project done by Thanishka ,Uma ,Tharuna ,Thanmayi
</div>

<br>

<div align="center">

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38Bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini API](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## 🌟 Overview & Vision

**Griha-Mitra** is a comprehensive full-stack platform designed to bridge language barriers, streamline household management, and provide immediate, intelligent technical support for home appliances. Built with accessibility at its core, the application caters directly to domestic workers and employers by offering seamless cross-language voice translation, visual AI diagnostics for machine errors, and dynamic daily work ledgers.

---

## 🛠️ The Tech Stack & Why We Chose It

Every technology in Griha-Mitra was purposefully chosen to ensure maximum performance, ease of use, and low latency for real-time accessibility contexts:

| Technology | Category | Why We Are Using It |
| :--- | :--- | :--- |
| **React** | Frontend Library | Component-based architecture allows us to cleanly split the application into isolated, high-performance views (`Home`, `Appliance`, `Translator`, `Ledger`) while managing dynamic state efficiently. |
| **Vite** | Build Tool & Dev Server | Offers lightning-fast Hot Module Replacement (HMR) and features a built-in **development proxy** that effortlessly routes frontend API requests to our backend without running into browser CORS blocks. |
| **Tailwind CSS** | Styling Framework | Enables rapid custom Neo-Brutalist styling with heavy borders and high-contrast components, ensuring maximum readability and accessibility on mobile viewports. |
| **Node.js & Express** | Backend Server | Lightweight and robust runtime environment that acts as a secure middleware layer, keeping API keys hidden from the client while handling multipart form data. |
| **Google Gemini API (`gemini-1.5-flash`)** | Generative AI & Vision | Provides low-latency multimodal capabilities to instantly analyze appliance error photos and handle strict context-aware cross-language translations. |
| **Web Speech API** | Browser Native Audio | Leverages native browser speech-to-text and text-to-speech engines to power the hands-free "Walkie-Talkie" mode and voice task input without requiring expensive external paid audio libraries. |

---

## 📂 Master Folder Structure

```text
grihamitra/
├── backend/                  # Express API Server Middleware
│   ├── .env                  # Private environment variables (Gemini API Key)
│   ├── .env.example          # Template file for environment config
│   ├── package.json          # Backend dependencies (express, multer, dotenv, google-genai)
│   ├── README.md             # Detailed backend setup documentation
│   └── server.js             # Core server logic handling image vision & translation routes
│
└── frontend/                 # React & Vite Single Page Application
    ├── public/               # Static assets and favicons
    ├── src/
    │   ├── assets/           # Graphics and media files
    │   ├── components/       # Modular layout components
    │   ├── context/          # Global application context handlers
    │   ├── services/         # API connection layers
    │   ├── views/            # Core feature screens
    │   │   ├── ApplianceView.jsx  # Vision AI scanner parsing Markdown repair steps
    │   │   ├── HomeView.jsx       # Dashboard hub & global language switcher
    │   │   ├── LedgerView.jsx     # Daily work tracker with voice task entry
    │   │   └── TranslatorView.jsx # Walkie-talkie mode for real-time speech translation
    │   ├── App.css           # Global layout animation rules
    │   ├── App.jsx           # Root layout router and switcher
    │   ├── index.css         # Tailwind directives & neo-brutalist theme classes
    │   ├── main.jsx          # React DOM mount point
    │   └── translations.js   # Multilingual localization dictionaries (7+ languages)
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html            # Entry HTML embedded with FontAwesome icons
    ├── package.json          # Frontend dependencies (react, react-markdown)
    └── vite.config.js        # Vite configuration containing local proxy routing
```

## 🚀 Quick Start & Execution Guide
To get Griha-Mitra running locally on your machine, follow these steps using two separate terminal windows.

** Prerequisites
* Node.js installed on your system.
* A valid Google Gemini API Key.

### Step 1: Initialize the Backend Server
Open a terminal and navigate into the backend directory:
```
cd backend
```
Install the required dependencies:
```
npm install
```
Create a .env file inside the backend/ folder and add your API key:
Code Snippet:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
Start the server:
```
node server.js
```
The server will boot up successfully on http://localhost:3000.

### Step 2: Initialize the Frontend Application
Open a second terminal window and navigate into the frontend directory:
```
cd frontend
```

Install the required dependencies:
```
npm install
```
Install Tailwind CSS, PostCSS, and Autoprefixer (if setting up styling configurations)
```
npm install -D tailwindcss postcss autoprefixer
```
Install React Markdown for AI diagnosis formatting
```
npm install react-markdown
```
Start the Vite development server:
```
npm run dev
```
Open your browser and navigate to http://localhost:5173.

### 💡 Key Features Implemented
* Dynamic Global Localization: Instantly switch the application interface between English, Hindi, Bengali, Telugu, Kannada, Tamil, and Malayalam.
* Multimodal Appliance Scanner: Snap or upload an image of a household appliance error code; Gemini vision analyzes the hardware state and renders formatted, step-by-step Markdown troubleshooting instructions.
* Walkie-Talkie Voice Translator: Tap-to-speak voice integration bridging communication gaps between employers and workers through live speech-to-text transcription and audio synthesis.
* Accessible Work Ledger: Maintain daily duties with interactive task completion checkboxes, an automated progress counter, and voice-to-text task insertion in your native language.
