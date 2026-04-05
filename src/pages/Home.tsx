import { Features } from "@/component/Features";
import { Hero } from "@/component/Hero";
import { TextToAudio } from "@/component/TextToAudio";
import { Testimonials } from "@/component/Testimonials";
import { FAQ } from "@/component/FAQ";
import { HeroSection } from "@/component/landing/HeroSection";

export const Home = () => {
  return (
    <>
      <HeroSection />
      <Hero />
      <TextToAudio />
      <Features />
      <Testimonials />
      <FAQ />
    </>
  );
};
