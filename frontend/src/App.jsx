import { useState } from 'react';
import HomeView from './views/HomeView';
import ApplianceView from './views/ApplianceView';
import TranslatorView from './views/TranslatorView';
import LedgerView from './views/LedgerView';
import { dictionary, languageMap } from './translations';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('en');
  
  const t = dictionary[lang] || dictionary['en'];

  return (
    <div className="flex justify-center items-center h-screen m-0 relative bg-gray-100">
      <div className="w-full max-w-[400px] h-full max-h-[850px] bg-white border-[4px] border-black flex flex-col relative overflow-hidden shadow-2xl">
        
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 bg-gray-50 pb-20">
          {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} lang={lang} setLang={setLang} t={t} />}
          {activeTab === 'appliance' && <ApplianceView t={t} lang={lang} />}
          {activeTab === 'translator' && <TranslatorView t={t} lang={lang} languageMap={languageMap} />}
          {activeTab === 'ledger' && <LedgerView t={t} lang={lang} />}
        </div>

        <div className="text-center p-2 text-[10px] font-bold text-gray-500 bg-white">
          © 2027 Thanishka-K, Uma & Tanush. All rights reserved.
        </div>

        <div className="absolute bottom-0 w-full bg-white border-t-[4px] border-black flex h-[70px] z-40">
          {['home', 'appliance', 'translator', 'ledger'].map((tab) => {
            const isHome = tab === 'home';
            const icon = isHome ? 'fa-house' : tab === 'appliance' ? 'fa-plug' : tab === 'translator' ? 'fa-walkie-talkie' : 'fa-book';
            const labelKey = isHome ? 'nav_home' : `nav_${tab}`;
            
            return (
              <div 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`nav-item flex flex-col justify-center items-center ${activeTab === tab ? 'nav-active' : 'text-gray-600 bg-white'}`}
              >
                <i className={`fa-solid ${icon} mb-1`}></i>
                <span className="text-[10px] font-bold">{t[labelKey]}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default App;