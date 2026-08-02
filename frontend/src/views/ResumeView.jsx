import { useState, useEffect } from 'react';

const ResumeView = ({ t, lang, userKey }) => {
  const storageKey = `grihamitra_resume_data_${userKey || 'default'}`;

  // Load saved resume from local storage, or use default domestic worker profile
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {
      name: "Domestic Helper Profile",
      profession: "Experienced Household Caretaker",
      experience: "3",
      phone: userKey || "",
      skills: "Cooking, Cleaning, Laundry, Child Care, Elder Care, Dishwashing",
      bio: "Professional and reliable household caretaker with extensive experience in residential housekeeping, deep cleaning, and meal preparation."
    };
  });

  const [isEditing, setIsEditing] = useState(false);

  // Save to local storage whenever data or userKey changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(resumeData));
  }, [resumeData, storageKey]);

  // Sync state if userKey changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setResumeData(saved ? JSON.parse(saved) : {
      name: "Domestic Helper Profile",
      profession: "Experienced Household Caretaker",
      experience: "3",
      phone: userKey || "",
      skills: "Cooking, Cleaning, Laundry, Child Care, Elder Care, Dishwashing",
      bio: "Professional and reliable household caretaker with extensive experience in residential housekeeping, deep cleaning, and meal preparation."
    });
  }, [storageKey, userKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full print:bg-white p-4 overflow-y-auto no-scrollbar">
      
      {/* Header - Hidden during printing */}
      <div className="brutal-box p-3 bg-white mb-4 shrink-0 text-center print:hidden">
        <h1 className="font-extrabold text-xl text-teal-700 tracking-tight uppercase">
          {t?.nav_resume || "WORKER PROFILE"}
        </h1>
      </div>

      {/* Action Buttons - Hidden during printing */}
      <div className="flex gap-2 mb-4 shrink-0 print:hidden">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`brutal-btn flex-1 py-2 font-bold uppercase text-sm ${isEditing ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}
        >
          <i className={`fa-solid ${isEditing ? 'fa-eye' : 'fa-pen'} mr-2`}></i>
          {isEditing ? "Preview Resume" : "Edit Details"}
        </button>
        
        {!isEditing && (
          <button 
            onClick={handlePrint}
            className="brutal-btn bg-teal-700 text-white px-4 font-bold"
            title="Print or Save as PDF"
          >
            <i className="fa-solid fa-print"></i>
          </button>
        )}
      </div>

      <div className="flex-1 pb-4">
        {isEditing ? (
          // ================= EDIT MODE =================
          <div className="brutal-box p-4 bg-gray-100 flex flex-col gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-gray-700 mb-1 block">Full Name</label>
              <input type="text" name="name" value={resumeData.name} onChange={handleChange} placeholder="e.g. Sunita Devi" className="w-full brutal-box mb-0 p-2 text-sm font-semibold outline-none focus:bg-yellow-50" />
            </div>
            
            <div>
              <label className="text-xs font-bold uppercase text-gray-700 mb-1 block">Trade / Profession</label>
              <input type="text" name="profession" value={resumeData.profession} onChange={handleChange} placeholder="e.g. Master Cook & Caretaker" className="w-full brutal-box mb-0 p-2 text-sm font-semibold outline-none focus:bg-yellow-50" />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs font-bold uppercase text-gray-700 mb-1 block">Experience (Years)</label>
                <input type="number" name="experience" value={resumeData.experience} onChange={handleChange} placeholder="e.g. 5" className="w-full brutal-box mb-0 p-2 text-sm font-semibold outline-none focus:bg-yellow-50" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold uppercase text-gray-700 mb-1 block">Phone Number</label>
                <input type="tel" name="phone" value={resumeData.phone} onChange={handleChange} placeholder="e.g. 9876543210" className="w-full brutal-box mb-0 p-2 text-sm font-semibold outline-none focus:bg-yellow-50" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-700 mb-1 block">Key Skills (Comma separated)</label>
              <input type="text" name="skills" value={resumeData.skills} onChange={handleChange} placeholder="e.g. Cooking, Cleaning, Child Care" className="w-full brutal-box mb-0 p-2 text-sm font-semibold outline-none focus:bg-yellow-50" />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-700 mb-1 block">About Me</label>
              <textarea name="bio" value={resumeData.bio} onChange={handleChange} placeholder="A short description about your work ethic..." rows="3" className="w-full brutal-box mb-0 p-2 text-sm font-semibold outline-none focus:bg-yellow-50 resize-none"></textarea>
            </div>
          </div>
        ) : (
          // ================= PREVIEW / PRINT MODE =================
          <div className="brutal-box p-6 bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] print:shadow-none print:border-2">
            
            {/* Header section */}
            <div className="border-b-4 border-black pb-4 mb-4 flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-black uppercase text-black tracking-tight">
                  {resumeData.name || "YOUR NAME"}
                </h1>
                <p className="text-sm font-bold text-teal-700 uppercase mt-1">
                  {resumeData.profession || "YOUR TRADE"}
                </p>
              </div>
              
              {/* Profile Icon */}
              <div className="w-14 h-14 bg-yellow-400 border-2 border-black flex items-center justify-center rounded-full shrink-0">
                <i className="fa-solid fa-user text-2xl text-black"></i>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 border-2 border-black">
                <p className="text-[10px] font-extrabold uppercase text-gray-600 mb-1">Experience</p>
                <p className="font-black text-base">{resumeData.experience ? `${resumeData.experience} Years` : '—'}</p>
              </div>
              <div className="bg-gray-50 p-3 border-2 border-black">
                <p className="text-[10px] font-extrabold uppercase text-gray-600 mb-1">Contact</p>
                <p className="font-black text-xs">{resumeData.phone || '—'}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-6">
              <h3 className="font-black text-xs uppercase bg-black text-white inline-block px-2 py-1 mb-2">About Professional</h3>
              <p className="text-xs font-semibold text-gray-800 leading-relaxed">
                {resumeData.bio || "No bio provided."}
              </p>
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="font-black text-xs uppercase bg-black text-white inline-block px-2 py-1 mb-3">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills ? resumeData.skills.split(',').map((skill, index) => (
                  <span key={index} className="bg-yellow-300 border-2 border-black px-2 py-1 text-[10px] font-extrabold uppercase">
                    {skill.trim()}
                  </span>
                )) : (
                  <span className="text-xs font-bold text-gray-400">No skills listed.</span>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeView;