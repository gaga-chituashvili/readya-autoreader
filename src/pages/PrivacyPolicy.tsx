import { useTranslation } from "react-i18next";
import type { PrivacySection } from "@/types/privacy";

export const PrivacyPolicy = () => {
  const { t } = useTranslation("privacy");

  const sections = t("sections", {
    returnObjects: true,
    defaultValue: [],
  }) as PrivacySection[];

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-black py-12 px-4 pb-20 sm:pb-28 md:pb-40 lg:pb-56">
      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg px-6 sm:px-10 py-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900 dark:text-white">
          {t("title")}
        </h1>

        <div className="w-full h-[2px] bg-gray-800 dark:bg-white mt-6 mb-8" />

        <p className="text-left text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-2 mb-10">
          {t("updated")}
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          {t("intro")}
        </p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3 text-base sm:text-lg">
                {section.title}
              </h2>

              <div className="space-y-2">
                {section.content?.map((line, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
