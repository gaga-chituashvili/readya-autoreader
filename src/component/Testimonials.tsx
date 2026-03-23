import { useTranslation } from "react-i18next";
import { testimonials } from "../data/testimonialsData";

export const Testimonials = () => {
  const { t } = useTranslation("home");

  return (
    <section className="py-20 px-6 bg-gray-100 dark:bg-black">
      <h2 className="text-center text-2xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
        {t("testimonial_title")}
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <article
            key={index}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center shadow-md"
          >
            <img
              src={item.image}
              alt={t(item.name)}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
            />

            <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
              {t(item.name)}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {t(item.text)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
