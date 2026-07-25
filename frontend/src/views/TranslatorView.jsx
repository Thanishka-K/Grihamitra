import { useState, useRef, useEffect } from 'react';

const TranslatorView = ({ t, lang, languageMap }) => {
  const [chat, setChat] = useState([]);
  const [activeMic, setActiveMic] = useState(null); 
  const chatEndRef = useRef(null);

  const workerLangName = languageMap[lang] ? languageMap[lang].toUpperCase() : 'ENGLISH';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const simulateWalkieTalkie = (speakerRole) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice features. Try Chrome or Safari.");
      return;
    }

    const isWorker = speakerRole === 'worker';
    const msgId = Date.now(); 
    const speakerLabel = isWorker ? `WORKER (${workerLangName})` : "EMPLOYER (ENGLISH)";

    setActiveMic(speakerRole);

    // Add listening bubble
    setChat(prev => [...prev, { id: msgId, type: 'listening', isWorker, speakerLabel }]);

    const recognition = new SpeechRecognition();

    if (isWorker) {
      const langCodes = { 'hi': 'hi-IN', 'te': 'te-IN', 'kn': 'kn-IN', 'bn': 'bn-IN', 'ta': 'ta-IN', 'ml': 'ml-IN', 'en': 'en-IN' };
    } else {
      recognition.lang = 'en-US';
    }

    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      const ttsLang = isWorker ? 'en-US' : recognition.lang;
      
      // If worker speaks, translate to English ('en'). If employer speaks, translate to worker's language code (lang).
      const targetLang = isWorker ? 'en' : lang;

      // Show temporary loading state while Gemini translates
      setChat(prev => prev.map(msg =>
        msg.id === msgId ? { ...msg, type: 'result', spokenText, translatedText: "Translating via AI..." } : msg
      ));

      try {
        // Send the text to your new backend endpoint
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: spokenText, targetLang })
        });
        
        const data = await res.json();
        const finalTranslation = data.translatedText || "Translation failed.";

        // Update the UI with the real translation
        setChat(prev => prev.map(msg =>
          msg.id === msgId ? { ...msg, translatedText: finalTranslation } : msg
        ));

        // Play the translated text out loud
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(finalTranslation);
          utterance.lang = ttsLang;
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }
      } catch (error) {
        setChat(prev => prev.map(msg =>
          msg.id === msgId ? { ...msg, translatedText: "Network Error" } : msg
        ));
      }
    };

    recognition.onerror = (event) => {
      setChat(prev => prev.map(msg =>
        msg.id === msgId ? { ...msg, type: 'error', errorText: event.error } : msg
      ));
      setActiveMic(null);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setActiveMic(null);
    };

    try {
      recognition.start();
    } catch (error) {
      setChat(prev => prev.map(msg =>
        msg.id === msgId ? { ...msg, type: 'error', errorText: "Error starting mic." } : msg
      ));
      setActiveMic(null);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden pb-4">
      {/* Header Box (Slightly reduced padding) */}
      <div className="brutal-box p-3 bg-yellow-400 mb-2 shrink-0">
        <h1 className="font-extrabold text-xl text-black">{t.nav_translator}</h1>
        <p className="text-[10px] font-bold uppercase mt-1 text-gray-800">Walkie-Talkie Mode</p>
      </div>

      {/* Dynamic Chat Area (Takes up maximum available space) */}
      <div className="flex-1 brutal-box p-4 bg-gray-50 overflow-y-auto mb-2 flex flex-col gap-3 min-h-0">
        {chat.length === 0 ? (
          <div className="text-center text-gray-400 text-sm font-bold mt-10">
            <i className="fa-solid fa-walkie-talkie text-4xl mb-2"></i><br/>
            <span>{t.mic_instruction}</span>
          </div>
        ) : (
          chat.map((msg) => (
            <div key={msg.id} className={`p-3 brutal-box ${msg.isWorker ? 'bg-teal-50 ml-6' : 'bg-blue-50 mr-6'} shadow-sm`}>
              {msg.type === 'listening' && (
                <p className="text-sm text-gray-500 italic">
                  <i className="fa-solid fa-microphone fa-fade"></i> Listening...
                </p>
              )}
              {msg.type === 'error' && (
                <p className="text-sm text-red-500 font-bold">
                  <i className="fa-solid fa-triangle-exclamation"></i> Error: {msg.errorText}
                </p>
              )}
              {msg.type === 'result' && (
                <>
                  <p className="text-[10px] font-bold text-gray-500 mb-1">{msg.speakerLabel}</p>
                  <p className="text-sm font-bold mb-2">"{msg.spokenText}"</p>
                  <div className="border-t-2 border-black pt-2">
                    <p className="text-[10px] font-bold text-green-600 mb-1">
                      <i className="fa-solid fa-language"></i> TRANSLATION
                    </p>
                    <p className="text-md font-extrabold text-blue-900">"{msg.translatedText}"</p>
                  </div>
                </>
              )}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Microphone Buttons (Reduced size) */}
      <div className="grid grid-cols-2 gap-2 shrink-0">
        <button
          onClick={() => simulateWalkieTalkie('worker')}
          className={`brutal-btn p-2 flex flex-col items-center justify-center gap-1 h-16 ${activeMic === 'worker' ? 'mic-active' : 'bg-teal-600 text-white'}`}
        >
          <i className="fa-solid fa-microphone text-xl"></i>
          <span className="font-bold text-[11px] uppercase text-center tracking-tight">SPEAK {workerLangName}</span>
        </button>

        <button
          onClick={() => simulateWalkieTalkie('employer')}
          className={`brutal-btn p-2 flex flex-col items-center justify-center gap-1 h-16 ${activeMic === 'employer' ? 'mic-active' : 'bg-blue-900 text-white'}`}
        >
          <i className="fa-solid fa-microphone text-xl"></i>
          <span className="font-bold text-[11px] uppercase text-center tracking-tight">SPEAK ENGLISH</span>
        </button>
      </div>
    </div>
  );
};

export default TranslatorView;