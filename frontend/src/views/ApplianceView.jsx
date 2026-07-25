import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const ApplianceView = ({ t, lang }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultText, setResultText] = useState("Upload an image to see the AI diagnosis here.");
  const [manualTab, setManualTab] = useState('how-to');
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);
    setResultText('');
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('language', lang);

    try {
      const response = await fetch('/api/analyze-appliance', { method: 'POST', body: formData });
      const data = await response.json();
      setResultText(data.error ? `Error: ${data.error}` : data.solution);
    } catch (error) {
      setResultText("Connection Error! Make sure your backend terminal is still running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="block">
      <div className="brutal-box p-4 bg-white mb-4">
        <h1 className="font-extrabold text-lg text-blue-900">{t.nav_appliance}</h1>
      </div>

      <div className="brutal-box p-4 bg-teal-50 border-teal-600 mb-4">
        <p className="text-sm font-bold mb-2">{t.appliance_ai_title}</p>
        
        <label className="brutal-btn bg-teal-600 text-white w-full py-3 flex justify-center items-center gap-2 font-bold cursor-pointer">
          <i className="fa-solid fa-camera"></i> <span>{t.btn_take_picture}</span>
          <input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
        </label>

        {isAnalyzing && (
          <div className="mt-4 text-center py-4 border-2 border-dashed border-teal-600 bg-white">
            <i className="fa-solid fa-sparkles fa-spin text-teal-600 mb-2 text-xl"></i>
            <p className="text-sm font-bold text-teal-800">{t.gemini_loading}</p>
          </div>
        )}

        {!isAnalyzing && resultText !== "Upload an image to see the AI diagnosis here." && (
          <div className="mt-4 bg-white p-3 border-2 border-black">
            <p className="text-xs text-teal-600 font-bold uppercase mb-2">{t.gemini_diagnosis_label}</p>
            <div className="markdown-content text-sm text-gray-800 mt-2"><ReactMarkdown>{resultText}</ReactMarkdown></div>
          </div>
        )}
      </div>

      <div className="brutal-box p-4 bg-gray-100">
        <h2 className="font-bold text-lg">{t.manual_search_title}</h2>
        <p className="text-sm text-gray-600 mb-4">{t.manual_search_model}</p>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setManualTab('how-to')} className={`brutal-btn px-3 py-1 font-bold text-sm ${manualTab === 'how-to' ? 'bg-blue-900 text-white' : 'bg-white text-black'}`}>{t.btn_how_to_use}</button>
          <button onClick={() => setManualTab('fault')} className={`brutal-btn px-3 py-1 font-bold text-sm ${manualTab === 'fault' ? 'bg-blue-900 text-white' : 'bg-white text-black'}`}>{t.btn_fault_fix}</button>
        </div>
        
        {manualTab === 'how-to' && (
          <div className="bg-white p-3 border-2 border-black mb-2"><p className="text-sm font-bold">{t.manual_how_to_1}</p></div>
        )}
        {manualTab === 'fault' && (
          <div className="bg-red-100 p-3 border-2 border-black mb-2"><p className="text-sm text-red-900 font-bold">{t.manual_fault_1}</p></div>
        )}
      </div>
    </div>
  );
};
export default ApplianceView;