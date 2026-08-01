import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MobileScrollSlider } from "@/components/ui/MobileScrollSlider";

export default function Home() {
  return (
    <main className="relative">
      <MobileScrollSlider />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
}
