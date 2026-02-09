import readyalogo from "../../assets/Readyalogo.png";
import { FaMicrophoneAlt } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-b from-orange-600 to-orange-900 relative">
      <img
        src={readyalogo}
        alt="Readya Logo"
        className="md:absolute md:left-1/2 md:-translate-x-1/2"
      />

      <div className="flex gap-4 items-center ml-auto z-10">
        <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-400">
          დარეგისტრირდი
        </button>

        <button className="text-gray-700 hover:text-white transition flex items-center gap-2 border border-solid rounded-full p-2">
          <FaMicrophoneAlt />
          აუდიობლოგი
        </button>
      </div>
    </header>
  );
};
