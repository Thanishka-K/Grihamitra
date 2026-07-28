import { useState } from 'react';
import logoImg from '../assets/logo.jpeg';

const LoginView = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (mobile.trim().length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (pincode.trim().length < 4) {
      alert("Please enter a valid pincode.");
      return;
    }

    onLogin(mobile.trim());
  };

  return (
    <div className="flex flex-col items-center justify-between h-full w-full p-4 bg-gray-50 relative z-10">
      <div className="w-full"></div> {/* Spacer to balance flex layout */}

      <div className="brutal-box p-6 bg-white w-full max-w-sm flex flex-col items-center text-center shadow-xl">
        <div className="w-28 h-28 mb-3 flex items-center justify-center">
          <img src={logoImg} alt="Griha-Mitra Logo" className="w-full h-full object-contain" />
        </div>

        <h1 className="text-xl font-black text-teal-700 tracking-tight uppercase mb-1">
          GRIHA-MITRA
        </h1>
        <p className="text-[10px] font-bold text-gray-500 uppercase mb-5">
          Multilingual Household Companion
        </p>

        <form onSubmit={handleLoginSubmit} className="w-full flex flex-col gap-3 text-left">
          <div>
            <label className="text-[10px] font-extrabold text-gray-700 uppercase mb-1 block">
              Mobile Number
            </label>
            <input 
              type="tel" 
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 10-digit mobile" 
              required
              className="w-full brutal-box mb-0 p-3 outline-none focus:bg-yellow-50 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold text-gray-700 uppercase mb-1 block">
              Pincode
            </label>
            <input 
              type="password" 
              maxLength="6"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter area pincode" 
              required
              className="w-full brutal-box mb-0 p-3 outline-none focus:bg-yellow-50 text-sm font-semibold"
            />
          </div>

          <button 
            type="submit"
            className="brutal-btn bg-teal-700 text-white w-full py-3 font-bold text-sm uppercase flex items-center justify-center gap-2 mt-2"
          >
            <i className="fa-solid fa-right-to-bracket"></i> Login / Enter App
          </button>
        </form>
      </div>

      {/* Copyright Footer */}
      <div className="text-center text-[10px] font-bold text-gray-500 pb-2">
        © 2027 Thanishka, Uma, Tharuna & Thanmayi. All rights reserved.
      </div>
    </div>
  );
};

export default LoginView;