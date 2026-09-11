import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Experience from "@/app/components/sections/Experience";
import ProjectShowcase from "@/app/components/sections/ProjectShowcase";
import Skills from "@/app/components/sections/Skills";
import Contact from "@/app/components/sections/Contact";
import Footer from "@/app/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <ProjectShowcase />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
