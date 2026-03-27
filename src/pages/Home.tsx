import { Features } from "@/component/Features";
import { Hero } from "@/component/Hero";
import { TextToAudio } from "@/component/TextToAudio";
import { Testimonials } from "@/component/Testimonials";
import { FAQ } from "@/component/FAQ";

export const Home = () => {
  return (
    <>
      <Hero />
      <TextToAudio />
      <Features />
      <Testimonials />
      <FAQ />
    </>
  );
};
