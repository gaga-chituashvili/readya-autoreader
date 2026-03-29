import { useTranslation } from "react-i18next";
import { HeroButtons } from "./HeroButtons";

export const HeroContent = () => {
  const { t } = useTranslation("home");

  return (
    <div className="max-w-xl text-center lg:text-left">
      <h2 className="text-4xl sm:text-5xl font-bold text-indigo-500 mb-6">
        READYA.ME
      </h2>

      <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-4 leading-snug">
        {t("hero.title")}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base">
        {t("hero.description")}
      </p>

      <HeroButtons />
    </div>
  );
};
