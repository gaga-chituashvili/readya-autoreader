import { Features } from "../component/Features";
import { Hero } from "../component/Hero";
import { TextToAudio } from "../component/TextToAudio";
import { Testimonials } from "../component/Testimonials";

export const Home = () => {
  return (
    <>
      <Hero />
      <TextToAudio />
      <Features />
      <Testimonials />
    </>
  );
};
