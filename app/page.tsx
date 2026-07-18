import Navbar from "@/components/Navbar";
import BackgroundEffect from "@/components/BackgroundEffect";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import InvolvementsSection from "@/components/sections/InvolvementsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <BackgroundEffect />
      <main className="relative text-white overflow-x-hidden" style={{ zIndex: 10 }}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <InvolvementsSection />
        <ContactSection />
      </main>
    </>
  );
}
