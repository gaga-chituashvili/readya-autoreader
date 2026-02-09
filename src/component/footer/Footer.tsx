import { FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-black py-8 pb-24 sm:pb-36">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 max-w-7xl mx-auto text-gray-400 text-xs sm:text-sm px-4">
        <div className="flex items-center gap-1">
          Readya.me
          <FaRegCopyright size={12} className="inline" />
          {new Date().getFullYear()}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <Link to="/privacy" className="hover:text-white transition">
            დარეგისტრირდი
          </Link>
          <Link to="/terms" className="hover:text-white transition">
            მოუსმინე აუდიობლოგს
          </Link>
        </div>

        <span className="text-gray-500 text-center sm:text-right">
          Powered by Tvitploba
        </span>
      </div>
    </footer>
  );
};
