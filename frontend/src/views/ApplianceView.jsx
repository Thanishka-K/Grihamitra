import { useState, useRef } from 'react';
import { analyzeApplianceImage } from '../services/api';

// Simple loading spinner SVG to show we are waiting
const LoadingSpinner = () => (
  <svg style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px', verticalAlign: 'middle', marginRight: '8px' }} viewBox="0 0 24 24">
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="4" fill="none" strokeDasharray="31.4" strokeLinecap="round"/>
  </svg>
);

const ApplianceView = () => {
  const [steps, setSteps] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleImageSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);
    setSteps([]); 

    try {
      const aiResponse = await analyzeApplianceImage(file);
      if (aiResponse && Array.isArray(aiResponse)) {
        setSteps(aiResponse);
      } else {
        setSteps(["⚠️ Error: Could not generate steps. Try again."]);
      }
    } catch (error) {
      console.error(error);
      setSteps(["⚠️ Error: Failed to connect to the server."]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '20px' }}>
      
      <div className="brutal-box" style={{ cursor: 'default', backgroundColor: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '1000', color: '#1e3a8a', textTransform: 'uppercase' }}>AI APPLIANCE CENTER</h2>
      </div>

      {/* Action Area */}
      <div className="brutal-box" style={{ borderColor: '#0d9488', borderWidth: '5px', cursor: 'default', backgroundColor: '#fff' }}>
        <p style={{ fontSize: '16px', fontWeight: '900', marginBottom: '16px' }}>Identify Issue via AI Vision:</p>
        
        <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleImageSelected} style={{ display: 'none' }} />
        
        <button 
          onClick={handleCameraClick}
          disabled={isAnalyzing}
          style={{
            width: '100%',
            padding: '20px',
            backgroundColor: isAnalyzing ? '#e5e7eb' : '#0d9488', // Teal
            color: isAnalyzing ? '#4b5563' : 'white',
            border: '5px solid black',
            fontWeight: '1000',
            fontSize: '18px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: isAnalyzing ? 'wait' : 'pointer',
            boxShadow: isAnalyzing ? 'none' : '6px 6px 0px black',
            transform: isAnalyzing ? 'translate(3px, 3px)' : 'none',
            transition: 'all 0.1s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {isAnalyzing ? (
            <>
              <LoadingSpinner />
              ⏳ ANALYZING...
            </>
          ) : '📷 TAKE PICTURE'}
        </button>
      </div>

      {/* --- NEW FLASHY DYNAMIC RESULTS AREA --- */}
      {steps.length > 0 && (
        <div style={{ 
          marginTop: '10px',
          display: 'flex', flexDirection: 'column', gap: '16px', 
          border: '6px solid black',
          padding: '16px',
          backgroundColor: '#ffe4e6', // Very Light Pink Background for contrast
          boxShadow: '10px 10px 0px #0d9488' // Big Teal Shadow
        }}>
          
          {/* Exaggerated Title */}
          <div style={{
            backgroundColor: '#111827', // Almost black
            color: '#4ade80', // Neon Green
            padding: '12px',
            border: '4px solid black',
            textAlign: 'center',
            marginBottom: '4px',
            transform: 'rotate(-1deg)' // Slight skew for brutality
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '2px' }}>
              ✦ AI REPAIR GUIDE ✦
            </h3>
          </div>

          {/* Flashy step cards */}
          {steps.map((step, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white',
              border: '5px solid black',
              padding: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              boxShadow: '4px 4px 0px black'
            }}>
              {/* Massive Step Number Circle */}
              <div style={{
                flexShrink: 0,
                width: '45px', height: '45px',
                backgroundColor: index % 2 === 0 ? '#1e3a8a' : '#0d9488', // Alternating Blue and Teal
                color: 'white',
                border: '4px solid black',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', fontWeight: '1000',
                fontFamily: 'monospace' // Very clear numbers
              }}>
                {index + 1}
              </div>

              {/* Bold, readable text */}
              <p style={{ 
                fontSize: '17px', 
                fontWeight: '800', 
                lineHeight: '1.4', 
                color: 'black',
                paddingTop: '2px'
              }}>
                {step}
              </p>
            </div>
          ))}

          {/* Warning Flag */}
          <div style={{
            marginTop: '8px',
            border: '4px solid #b91c1c', // Dark Red
            backgroundColor: '#fef2f2', // Lighter Red
            padding: '10px',
            fontWeight: '900',
            color: '#b91c1c',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            WARNING: Disconnect power before attempting repairs.
          </div>

        </div>
      )}

      {/* Manual Search Fallback - Stripped down to keep emphasis on AI */}
      {steps.length === 0 && !isAnalyzing && (
        <div className="brutal-box" style={{ cursor: 'default', backgroundColor: '#fff', borderStyle: 'dashed', borderColor: '#d1d5db' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '8px', color: '#6b7280' }}>OR SEARCH MANUALLY</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ flex: 1, padding: '10px', backgroundColor: 'white', color: 'black', border: '3px solid #6b7280', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px' }}>HOW TO USE</button>
            <button style={{ flex: 1, padding: '10px', backgroundColor: 'white', color: 'black', border: '3px solid #6b7280', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px' }}>FAULT FIX</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ApplianceView;