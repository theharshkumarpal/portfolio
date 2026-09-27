import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen pt-20">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-brand-purple/5 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[40%] right-1/4 w-[400px] h-[400px] bg-brand-cyan/5 blur-[130px] rounded-full animate-pulse-slow pointer-events-none" />

      <Hero />
      <About />
      <Services />
      <TechStack />
      <Projects />
      <Experience />
      <CtaBanner />
      <Contact />
    </div>
  );
}
