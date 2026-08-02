import { useState } from 'react';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import ApplianceView from './views/ApplianceView';
import TranslatorView from './views/TranslatorView';
import LedgerView from './views/LedgerView';
import { dictionary, languageMap } from './translations';
import logoImg from './assets/logo.jpeg';
import ResumeView from './views/ResumeView';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('grihamitra_current_mobile') || null;
  });
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('en');
  
  const t = dictionary[lang] || dictionary['en'];

  const handleLogin = (mobileNumber) => {
    setCurrentUser(mobileNumber);
    localStorage.setItem('grihamitra_current_mobile', mobileNumber);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('grihamitra_current_mobile');
    setActiveTab('home');
  };

  return (
    <div className="flex justify-center items-center h-screen m-0 relative bg-gray-100">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[400px] h-full max-h-[850px] bg-white border-[4px] border-black flex flex-col relative overflow-hidden shadow-2xl">
        
        {/* Light Watermark Logo Overlay across all pages */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <img 
            src={logoImg} 
            alt="Watermark Overlay" 
            className="w-[85%] h-[85%] object-contain opacity-[0.15] select-none" 
          />
        </div>

        {!currentUser ? (
          <LoginView onLogin={handleLogin} />
        ) : (
          <>
            {/* Top Logout Header */}
            <div className="absolute top-2 right-2 z-50">
              <button 
                onClick={handleLogout}
                className="bg-red-100 text-red-600 px-2 py-1 text-[10px] font-extrabold uppercase border-2 border-black cursor-pointer hover:bg-red-200"
                title="Logout"
              >
                Logout
              </button>
            </div>

            {/* Main Views Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 bg-transparent pb-20 relative z-10">
              {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} lang={lang} setLang={setLang} t={t} userKey={currentUser} />}
              {activeTab === 'appliance' && <ApplianceView t={t} lang={lang} userKey={currentUser} />}
              {activeTab === 'translator' && <TranslatorView t={t} lang={lang} languageMap={languageMap} />}
              {activeTab === 'ledger' && <LedgerView t={t} lang={lang} userKey={currentUser} />}
              {activeTab === 'resume' && <ResumeView t={t} lang={lang} userKey={currentUser} />}
            </div>

            {/* Copyright Footer */}
            <div className="text-center p-2 text-[10px] font-bold text-gray-500 bg-white/80 backdrop-blur-xs border-t border-gray-200 relative z-10">
              © 2027 Thanishka-K, Uma & Tanush. All rights reserved.
            </div>

            {/* Bottom Navigation Bar */}
            <div className="absolute bottom-0 w-full bg-white border-t-[4px] border-black flex h-[70px] z-40">
              {['home', 'appliance', 'translator', 'ledger','resume'].map((tab) => {
                const isHome = tab === 'home';
                const icon = isHome ? 'fa-house' : tab === 'appliance' ? 'fa-plug' : tab === 'translator' ? 'fa-walkie-talkie' : 'fa-book';
                const labelKey = isHome ? 'nav_home' : `nav_${tab}`;
                const isActive = activeTab === tab;
                
                return (
                  <div 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex flex-col justify-center items-center cursor-pointer flex-1 transition-colors ${
                      isActive ? 'bg-teal-700 text-white font-black' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <i className={`fa-solid ${icon} mb-1 text-sm`}></i>
                    <span className="text-[10px] uppercase">{t[labelKey]}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default App;