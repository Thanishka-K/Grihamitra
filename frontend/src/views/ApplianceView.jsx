import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const ApplianceView = ({ t, lang, userKey }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultText, setResultText] = useState("Upload an image to see the AI diagnosis here.");
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Initialize history logs strictly tied to the current userKey session
  const [historyLogs, setHistoryLogs] = useState(() => {
    const storageKey = `grihamitra_appliance_history_${userKey || 'default'}`;
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [checkedLogs, setCheckedLogs] = useState({});
  const fileInputRef = useRef(null);

  // Save history logs tied strictly to the current userKey
  useEffect(() => {
    const storageKey = `grihamitra_appliance_history_${userKey || 'default'}`;
    localStorage.setItem(storageKey, JSON.stringify(historyLogs));
  }, [historyLogs, userKey]);

  // Reset state whenever the userKey changes
  useEffect(() => {
    const storageKey = `grihamitra_appliance_history_${userKey || 'default'}`;
    const saved = localStorage.getItem(storageKey);
    setHistoryLogs(saved ? JSON.parse(saved) : []);
    setResultText("Upload an image to see the AI diagnosis here.");
    setSelectedImage(null);
    setCheckedLogs({});
  }, [userKey]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imagePreviewUrl = URL.createObjectURL(file);
    setSelectedImage(imagePreviewUrl);

    setIsAnalyzing(true);
    setResultText('Analyzing via AI...');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('language', lang);

    try {
      const response = await fetch('/api/analyze-appliance', { method: 'POST', body: formData });
      const data = await response.json();
      
      const diagnosisResult = data.error ? `Error: ${data.error}` : data.solution;
      
      setResultText(diagnosisResult);

      const newLog = {
        id: Date.now(),
        image: imagePreviewUrl,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        summary: diagnosisResult.substring(0, 80) + '...',
        fullText: diagnosisResult
      };
      setHistoryLogs(prev => [newLog, ...prev]);

    } catch (error) {
      setResultText("Connection Error! Make sure your backend terminal is still running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleCheckbox = (id) => {
    setCheckedLogs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const deleteSelectedLogs = () => {
    const remainingLogs = historyLogs.filter(log => !checkedLogs[log.id]);
    setHistoryLogs(remainingLogs);
    setCheckedLogs({});
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-4">
      <div className="brutal-box p-3 bg-white mb-4 shrink-0 text-center">
        <h1 className="font-extrabold text-xl text-teal-700 tracking-tight uppercase">
          {t.nav_appliance || "APPLIANCE"}
        </h1>
      </div>

      <div className="brutal-box p-4 bg-yellow-400 mb-4 shrink-0">
        <h2 className="text-xs font-bold text-gray-900 uppercase mb-2">
          {t.appliance_ai_title || "Identify Issue via AI:"}
        </h2>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />

        <button 
          onClick={() => fileInputRef.current.click()}
          disabled={isAnalyzing}
          className="brutal-btn bg-teal-700 text-white w-full py-3 font-bold text-sm uppercase flex items-center justify-center gap-2 mb-4"
        >
          <i className="fa-solid fa-camera"></i>
          {isAnalyzing ? (t.gemini_loading || "Gemini AI Analyzing...") : (t.btn_take_picture || "TAKE PICTURE OF ERROR")}
        </button>

        {selectedImage && (
          <div className="brutal-box mb-4 bg-white p-2 flex flex-col items-center">
            <p className="text-[10px] font-extrabold text-gray-500 uppercase mb-1 self-start">UPLOADED IMAGE:</p>
            <img 
              src={selectedImage} 
              alt="Uploaded Appliance Error" 
              className="max-h-40 object-contain brutal-box mb-0" 
            />
          </div>
        )}

        <div className="brutal-box p-4 bg-white max-h-60 overflow-y-auto">
          <p className="text-[10px] font-extrabold text-gray-500 uppercase mb-1">
            {t.gemini_diagnosis_label || "GEMINI DIAGNOSIS:"}
          </p>
          <div className="markdown-content text-sm text-gray-800">
            <ReactMarkdown>{resultText}</ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-extrabold text-sm uppercase tracking-wide text-gray-700 flex items-center gap-2">
            <i className="fa-solid fa-clock-rotate-left"></i> History Logs
          </h3>
          
          {Object.values(checkedLogs).some(Boolean) && (
            <button 
              onClick={deleteSelectedLogs}
              className="text-[10px] font-extrabold text-red-600 bg-white px-2 py-1 brutal-box mb-0 hover:bg-red-50 uppercase tracking-tight"
            >
              <i className="fa-solid fa-trash-can mr-1"></i> Delete Selected
            </button>
          )}
        </div>

        {historyLogs.length === 0 ? (
          <div className="brutal-box p-4 bg-gray-50 text-center text-gray-400 text-xs font-bold">
            No previous scans logged yet. Take a picture above to record a history log.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {historyLogs.map(log => (
              <div key={log.id} className="brutal-box p-3 bg-white flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={!!checkedLogs[log.id]}
                  onChange={() => toggleCheckbox(log.id)}
                  className="w-5 h-5 mt-1 border-2 border-black accent-teal-600 cursor-pointer shrink-0"
                />
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <span>SCAN RECORD</span>
                    <span>{log.time}</span>
                  </div>
                  <p className="text-xs font-bold text-black line-clamp-2">
                    {log.summary}
                  </p>
                  <button 
                    onClick={() => {
                      setResultText(log.fullText);
                      if (log.image) setSelectedImage(log.image);
                    }}
                    className="text-left text-[11px] font-extrabold text-teal-700 hover:underline mt-1"
                  >
                    View Full Report →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplianceView;