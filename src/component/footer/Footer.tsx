import { FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-black py-8 pb-36">
      <div className="flex justify-between items-center max-w-7xl mx-auto text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          Readya.me <FaRegCopyright size={12} className="inline" />{" "}
          {new Date().getFullYear()}
        </div>

        <div className="flex gap-8">
          <Link to="/privacy" className="hover:text-white">
            დარეგისტრირდი
          </Link>
          <Link to="/terms" className="hover:text-white">
            მოუსმინე აუდიობლოგს
          </Link>
        </div>

        <span className="text-gray-500">Powered by Tvitploba</span>
      </div>
    </footer>
  );
};
