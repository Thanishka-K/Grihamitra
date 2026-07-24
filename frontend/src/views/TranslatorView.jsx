import { useState, useRef, useEffect } from 'react';
import { translateAudio } from '../services/api'; // Make sure this points to your API call

const TranslatorView = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [targetLang, setTargetLang] = useState('hi'); // Default: Hindi
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US'; // Employer speaks English

      recognitionRef.current.onresult = async (event) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        handleTranslation(spokenText, targetLang);
      };

      // NEW: Catch errors and alert you
      recognitionRef.current.onerror = (event) => {
        console.error("Microphone Error:", event.error);
        if (event.error === 'not-allowed') {
          alert("Microphone access is blocked! Please click the lock/mic icon in your URL bar and allow access.");
        } else {
          alert(`Speech recognition failed: ${event.error}`);
        }
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.warn("Speech Recognition API is not supported in this browser.");
      alert("Please open this app in Google Chrome for voice features to work.");
    }
  }, [targetLang]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      setTranslation('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleTranslation = async (text, lang) => {
    try {
      // Assuming translateAudio in api.js is updated to send JSON { text, targetLang }
      const response = await fetch('http://localhost:3000/api/voice/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang: lang })
      });
      
      const data = await response.json();
      if (data.translatedText) {
        setTranslation(data.translatedText);
        speakTranslation(data.translatedText, lang);
      }
    } catch (error) {
      console.error("Translation failed", error);
      setTranslation("⚠️ Error: Could not translate.");
    }
  };

  const speakTranslation = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'kn' ? 'kn-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '20px' }}>
      
      <div className="brutal-box" style={{ cursor: 'default', backgroundColor: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '1000', color: '#b91c1c', textTransform: 'uppercase' }}>
          DHWANI TRANSLATOR
        </h2>
      </div>

      {/* Controls Area */}
      <div className="brutal-box" style={{ borderColor: '#4338ca', borderWidth: '5px', backgroundColor: '#fff' }}>
        <p style={{ fontSize: '16px', fontWeight: '900', marginBottom: '12px' }}>Target Language:</p>
        
        <select 
          value={targetLang} 
          onChange={(e) => setTargetLang(e.target.value)}
          style={{
            width: '100%', padding: '12px', marginBottom: '20px',
            border: '4px solid black', fontSize: '16px', fontWeight: '800',
            backgroundColor: '#e0e7ff', cursor: 'pointer'
          }}
        >
          <option value="hi">Hindi</option>
          <option value="kn">Kannada</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
        </select>

        <button 
          onClick={toggleRecording}
          style={{
            width: '100%', padding: '24px',
            backgroundColor: isRecording ? '#ef4444' : '#4338ca', // Red when recording, Indigo otherwise
            color: 'white',
            border: '5px solid black',
            fontWeight: '1000', fontSize: '18px', textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: isRecording ? 'none' : '6px 6px 0px black',
            transform: isRecording ? 'translate(3px, 3px)' : 'none',
            transition: 'all 0.1s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
        }}>
          {isRecording ? '🛑 STOP RECORDING' : '🎙️ TAP TO SPEAK'}
        </button>
      </div>

      {/* Results Area */}
      {(transcript || translation) && (
        <div style={{ 
          display: 'flex', flexDirection: 'column', gap: '16px', 
          border: '6px solid black', padding: '16px',
          backgroundColor: '#f3f4f6',
          boxShadow: '10px 10px 0px #4338ca' 
        }}>
          
          <div style={{ backgroundColor: 'white', border: '4px solid black', padding: '12px' }}>
            <p style={{ fontSize: '12px', fontWeight: '900', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>
              You Said (English):
            </p>
            <p style={{ fontSize: '18px', fontWeight: '700', color: 'black' }}>
              {transcript || '...'}
            </p>
          </div>

          <div style={{ backgroundColor: '#fef08a', border: '4px solid black', padding: '12px' }}>
            <p style={{ fontSize: '12px', fontWeight: '900', color: '#b45309', textTransform: 'uppercase', marginBottom: '4px' }}>
              Translated Output:
            </p>
            <p style={{ fontSize: '20px', fontWeight: '900', color: 'black' }}>
              {translation || 'Translating...'}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default TranslatorView;