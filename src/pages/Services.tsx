import { features } from "@/data/featuresData";
import { useTranslation } from "react-i18next";

export const Services = () => {
  const { t } = useTranslation(["home", "services"]);

  return (
    <section className="relative overflow-hidden py-20  px-6 bg-gray-100 dark:bg-black">
      <div className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70" />
      <section className="max-w-6xl mx-auto grid grid-cols-1 gap-y-10 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <h2 className="text-left text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          {t("services:services")}
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 z-30">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={index}
                className="bg-gray-200 dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
                  <Icon size={20} />
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t(item.title!)}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(item.description)}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
};
