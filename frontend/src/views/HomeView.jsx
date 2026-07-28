const HomeView = ({ setActiveTab, lang, setLang, t, userKey }) => {
  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Warm Greeting Header Box */}
      <div className="brutal-box p-4 bg-white text-center">
        <h1 className="font-black text-lg text-teal-700 tracking-tight uppercase">
          Hello, {userKey || "Friend"}! 👋
        </h1>
        <p className="text-[11px] font-bold text-gray-500 uppercase mt-1">
          {t.app_subtitle || "Welcome back to your companion"}
        </p>
      </div>

      <div className="brutal-box p-3 border-2 border-black">
        <p className="text-xs font-bold mb-2 flex items-center gap-1">
          <i className="fa-solid fa-globe"></i> <span>{t.global_lang}</span>
        </p>
        <div className="flex justify-between gap-1">
          {['en', 'hi', 'bn', 'te', 'kn', 'ta', 'ml'].map((l) => (
            <button 
              key={l}
              onClick={() => setLang(l)} 
              className={`lang-btn brutal-btn text-xs px-2 py-2 flex-1 font-bold ${lang === l ? 'bg-blue-900 text-white' : 'bg-white text-black'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="brutal-box p-5 mt-4 cursor-pointer" onClick={() => setActiveTab('appliance')}>
        <h2 className="font-bold text-lg text-blue-900">{t.nav_appliance}</h2>
        <p className="text-xs text-gray-500 font-semibold uppercase">{t.appliance_desc}</p>
      </div>
      <div className="brutal-box p-5 bg-yellow-400 cursor-pointer" onClick={() => setActiveTab('translator')}>
        <h2 className="font-bold text-lg text-black">{t.nav_translator}</h2>
        <p className="text-xs text-black font-semibold uppercase">{t.translator_desc}</p>
      </div>
      <div className="brutal-box p-5 bg-blue-900 cursor-pointer" onClick={() => setActiveTab('ledger')}>
        <h2 className="font-bold text-lg text-white">{t.nav_ledger}</h2>
        <p className="text-xs text-gray-300 font-semibold uppercase">{t.ledger_desc}</p>
      </div>
    </div>
  );
};
export default HomeView;