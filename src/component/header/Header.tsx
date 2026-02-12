import { useState } from "react";
import { FaMicrophoneAlt, FaBars, FaTimes } from "react-icons/fa";
import readyalogo from "../../assets/Readyalogo.png";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <header className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-b from-orange-600 to-orange-900">
      <img
        src={readyalogo}
        alt="Readya Logo"
        className="h-10 z-50 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
        onClick={reloadPage}
      />

      <div className="hidden md:flex items-center gap-4">
        <button className="bg-white text-black px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
          დარეგისტრირდი
        </button>

        <button className="text-white flex items-center gap-2 border border-white/60 px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:bg-white hover:text-orange-700 hover:scale-105 hover:shadow-lg active:scale-95">
          <FaMicrophoneAlt />
          აუდიობლოგი
        </button>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white text-2xl z-50"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
      />

      <div
        className={`fixed top-20 right-0 h-[15rem]  w-72 bg-orange-800 p-8 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out shadow-2xl md:hidden rounded-2xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mt-16 flex flex-col gap-6">
          <button className="bg-white text-black px-4 py-2 rounded-full w-full transition-all duration-300 hover:scale-105 active:scale-95">
            დარეგისტრირდი
          </button>

          <button className="text-white flex items-center justify-center gap-2 border border-white/60 rounded-full px-4 py-2 w-full transition-all duration-300 hover:bg-white hover:text-orange-700 hover:scale-105 active:scale-95">
            <FaMicrophoneAlt />
            აუდიობლოგი
          </button>
        </div>
      </div>
    </header>
  );
};
