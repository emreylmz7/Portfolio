"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { sectionIds } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <SectionWrapper id={sectionIds.projects}>
      <Container>
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of projects I've built recently"
        />
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="mt-6 text-center sm:mt-8 md:mt-10">
          <Link
            href="/projects"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </SectionWrapper>
  );
}
