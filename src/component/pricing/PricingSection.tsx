import { useState } from "react";
import { PricingCard } from "@/component/pricing/PricingCard";
import { PricingToggle } from "@/component/pricing/PricingToggle";
import { useTranslation } from "react-i18next";

export const PricingSection = () => {
  const { t } = useTranslation("pricing");
  const [activePlan, setActivePlan] = useState("monthly");

  const raw = t("plans.monthly", {
    returnObjects: true,
    defaultValue: [],
  });

  const data = Array.isArray(raw) ? raw : [];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          {t("title")}
        </h2>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {t("description1")}
        </p>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
          {t("description2")}
        </p>
      </div>

      <PricingToggle active={activePlan} onChange={setActivePlan} />

      <section
        className="
          mt-10 sm:mt-12
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-5 sm:gap-6
          max-w-6xl mx-auto
        "
      >
        {data.map((item, i) => (
          <PricingCard key={i} {...item} active={item.type === activePlan} />
        ))}
      </section>
    </section>
  );
};
