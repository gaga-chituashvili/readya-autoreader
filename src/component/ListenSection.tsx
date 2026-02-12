import listenicon from "../assets/listenicon.png";
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoMdVolumeHigh } from "react-icons/io";

const ListenSection = () => {
  return (
    <section className="bg-gradient-to-b from-orange-900 via-red-950 to-black py-44 md:px-8 px-1">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex flex-col gap-6">
          <button className="bg-orange-800/80 text-white  px-8 py-4 rounded-full flex items-center gap-3 md:text-xl text-xl/2 font-bold hover:bg-orange-700/80 w-fit">
            <IoMdVolumeHigh className="text-2xl" />
            მოუსმინე
          </button>
          <div className="flex items-center md:gap-3 gap-1">
            <span className="text-white md:text-6xl text-2xl font-bold">
              რასაც გინდა
            </span>
            <FaArrowTurnDown className="text-white md:text-3xl text-2xl" />
          </div>
        </div>

        <img
          src={listenicon}
          alt="Listen Icon"
          className="md:w-40 w-32 md:h-40 h-32"
        />
      </div>
    </section>
  );
};

export default ListenSection;
