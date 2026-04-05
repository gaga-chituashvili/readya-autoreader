import { PricingSection } from "@/component/pricing/PricingSection";

export const PricingPage = () => {
  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center
        bg-gray-50 dark:bg-black
        px-4 md:px-10 py-10 overflow-hidden
      "
    >
      <article className="w-full max-w-6xl z-10">
        <PricingSection />
      </article>
      <div className="pointer-events-none absolute -bottom-[10rem] -right-50% w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70" />
    </section>
  );
};
