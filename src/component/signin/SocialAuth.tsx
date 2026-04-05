import { GoogleAuthButton } from "@/component/GoogleAuthButton";

export const SocialAuth = () => {
  return (
    <article className="flex gap-4 justify-center mt-4">
      <button
        className="p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 
        hover:scale-105 transition"
      >
        <GoogleAuthButton />
      </button>
    </article>
  );
};
