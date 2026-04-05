import { useTranslation } from "react-i18next";

export const AboutUs = () => {
  const { t } = useTranslation("about");

  const features = t("features", { returnObjects: true }) as string[];
  const audience = t("audience", { returnObjects: true }) as string[];
  const benefits = t("benefits", { returnObjects: true }) as string[];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="pointer-events-none absolute bottom-20 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70 dark:opacity-40" />

      <article className="relative z-10 max-w-3xl space-y-6 sm:space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {t("subtitle")}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
          {t("description")}
        </p>

        <div>
          <p className="font-medium mb-2 text-gray-900 dark:text-white">
            {t("features_title")}
          </p>

          <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t("extra")}
          </p>
        </div>

        <div>
          <p className="font-medium mb-2 text-gray-900 dark:text-white">
            {t("audience_title")}
          </p>

          <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4 sm:pt-6 space-y-3">
          <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            {t("cta_title")}
          </p>

          <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm sm:text-base">
            {t("cta")}
          </p>
        </div>
      </article>
    </section>
  );
};
