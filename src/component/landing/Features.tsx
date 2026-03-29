import { FeatureCard } from "./FeatureCard";
import { useTranslation } from "react-i18next";

export const Features = () => {
  const { t } = useTranslation("home");

  const features = t("features", {
    returnObjects: true,
    defaultValue: [],
  }) as { points: string[] }[];

  return (
    <section
      id="features"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 scroll-mt-24"
    >
      {features.map((item, index) => (
        <FeatureCard key={index} item={item} />
      ))}
    </section>
  );
};
