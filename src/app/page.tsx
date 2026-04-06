import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { Skills } from "@/components/sections/skills";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Experience } from "@/components/sections/experience";
import { GitHubStats } from "@/components/sections/github-stats";
import { ContactCta } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Skills />
      <FeaturedProjects />
      <Experience />
      <GitHubStats />
      <ContactCta />
    </>
  );
}
