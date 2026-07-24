import { useState } from 'react';
import HomeView from './views/HomeView';
import ApplianceView from './views/ApplianceView';
import TranslatorView from './views/TranslatorView';
import LedgerView from './views/LedgerView';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      
      {/* Mobile Container bounds */}
      <div style={{ 
        width: '100%', maxWidth: '420px', backgroundColor: 'white', 
        borderLeft: '4px solid black', borderRight: '4px solid black',
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
      }}>
        
        {/* Main Content Area */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
          {activeTab === 'appliance' && <ApplianceView />}
          {activeTab === 'talk' && <TranslatorView />}
          {activeTab === 'ledger' && <LedgerView />}
        </div>

        {/* Clean Copyright Line */}
        <div style={{ textAlign: 'center', padding: '12px', fontSize: '10px', fontWeight: '800', color: 'black', backgroundColor: 'white' }}>
           © 2026 Thanishka-K, Uma & Tanush. All rights reserved.
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', borderTop: '4px solid black', backgroundColor: 'white' }}>
          {['home', 'appliance', 'talk', 'ledger'].map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                style={{ 
                  flex: 1, padding: '12px 0', 
                  borderRight: tab !== 'ledger' ? '2px solid black' : 'none', 
                  borderBottom: 'none', borderTop: 'none', borderLeft: 'none',
                  fontWeight: '900', fontSize: '10px', textTransform: 'uppercase',
                  backgroundColor: isSelected ? '#0d9488' : 'white', // Teal when active
                  color: isSelected ? 'white' : 'black',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
                }}>
                <span style={{ fontSize: '16px' }}>
                  {tab === 'home' && '🏠'}
                  {tab === 'appliance' && '🔌'}
                  {tab === 'talk' && '🎙️'}
                  {tab === 'ledger' && '📋'}
                </span>
                <span>{tab}</span>
              </button>
            )
          })}
        </div>

      </div>
    </div>
  );
}

export default App;