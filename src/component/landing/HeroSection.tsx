import { ScrollDownButton } from "@/component/ui/useScrollVisibility";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";
import { Features } from "./Features";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-white dark:bg-black overflow-hidden">
      <article className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <HeroContent />
          <HeroVisual />
        </div>

        <Features />
        <ScrollDownButton targetId="features" />
      </article>
    </section>
  );
};
