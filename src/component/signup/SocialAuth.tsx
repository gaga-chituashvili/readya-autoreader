import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const SocialAuth = () => {
  return (
    <article className="flex gap-4 justify-center mt-4">
      <button
        className="p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 
        hover:scale-105 transition"
      >
        <FaFacebookF className="text-blue-600 w-5 h-5" />
      </button>

      <button
        className="p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 
        hover:scale-105 transition"
      >
        <FcGoogle className="w-5 h-5" />
      </button>

      <button
        className="p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 
        hover:scale-105 transition"
      >
        <FaApple className="w-5 h-5 text-black dark:text-white" />
      </button>
    </article>
  );
};
