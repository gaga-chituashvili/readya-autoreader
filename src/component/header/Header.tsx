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
        <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-red-300">
          დარეგისტრირდი
        </button>
        <div className="flex gap-2 items-center">
          <FaMicrophoneAlt />
          <span className="text-gray-700">აუდიობლოგი</span>
        </div>
      </div>
    </header>
  );
};
