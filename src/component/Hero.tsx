import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation("hero");

  return (
    <section className="w-full py-24 px-6 bg-gray-100 dark:bg-black">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight md:whitespace-nowrap">
            {t("hero_title")}
          </h2>

          <p className="mt-6 max-w-md text-gray-600 dark:text-gray-300 text-lg leading-7">
            {t("hero_description")}
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 rounded-full bg-purple-500 text-white font-medium hover:bg-purple-600 transition">
              {t("learn_more")}
            </button>

            <button className="px-6 py-3 rounded-full bg-purple-400 text-white font-medium hover:bg-purple-500 transition">
              {t("try_readya")}
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <div className="relative flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-purple-400 flex items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer">
              <Play className="text-white" size={32} />
            </div>

            <div className="absolute w-36 h-36 rounded-full bg-purple-300 opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
