import { useState } from 'react';

const HomeView = ({ setActiveTab }) => {
  // Add a local state just to track which language button is clicked
  const [activeLang, setActiveLang] = useState('EN');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      
      {/* Header Box */}
      <div style={{ border: '4px solid black', padding: '16px', backgroundColor: 'white' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#1e3a8a', margin: '0 0 4px 0' }}>
          GRIHA-MITRA
        </h1>
        <p style={{ fontSize: '11px', fontWeight: '800', color: '#0d9488', margin: 0, textTransform: 'uppercase' }}>
          COMPANION
        </p>
      </div>

      {/* Global Language Box */}
      <div style={{ border: '4px solid black', padding: '16px', backgroundColor: 'white' }}>
        <p style={{ fontSize: '11px', fontWeight: '900', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🌐</span> GLOBAL LANGUAGE
        </p>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['EN', 'HI', 'BN', 'TE', 'KN'].map((l) => (
            <button 
              key={l}
              onClick={() => setActiveLang(l)} // This makes the button clickable
              style={{
                flex: 1, padding: '6px 0',
                backgroundColor: activeLang === l ? '#1e3a8a' : 'white', // Highlights the active one
                color: activeLang === l ? 'white' : 'black',
                border: '2px solid black',
                fontWeight: '900', fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* AI Appliance Center Box */}
      <div 
        onClick={() => setActiveTab('appliance')}
        style={{ border: '4px solid black', padding: '20px 16px', backgroundColor: 'white', cursor: 'pointer' }}
      >
        <h2 style={{ fontSize: '16px', fontWeight: '900', color: '#1e3a8a', margin: '0 0 4px 0' }}>
          AI APPLIANCE CENTER
        </h2>
        <p style={{ fontSize: '10px', fontWeight: '800', color: '#6b7280', margin: 0 }}>
          MODELS, REPAIRS & GUIDES
        </p>
      </div>

      {/* Translator Box */}
      <div 
        onClick={() => setActiveTab('talk')}
        style={{ border: '4px solid black', padding: '20px 16px', backgroundColor: '#fbbf24', cursor: 'pointer' }}
      >
        <h2 style={{ fontSize: '16px', fontWeight: '900', color: 'black', margin: '0 0 4px 0' }}>
          TRANSLATOR
        </h2>
        <p style={{ fontSize: '10px', fontWeight: '800', color: 'black', margin: 0 }}>
          ENGLISH TO LOCAL LANGUAGES
        </p>
      </div>

      {/* Job Ledger Box */}
      <div 
        onClick={() => setActiveTab('ledger')}
        style={{ border: '4px solid black', padding: '20px 16px', backgroundColor: '#1e3a8a', cursor: 'pointer' }}
      >
        <h2 style={{ fontSize: '16px', fontWeight: '900', color: 'white', margin: '0 0 4px 0' }}>
          JOB LEDGER
        </h2>
        <p style={{ fontSize: '10px', fontWeight: '800', color: '#d1d5db', margin: 0 }}>
          TRACK WORK & EARNINGS
        </p>
      </div>

    </div>
  );
};

export default HomeView;