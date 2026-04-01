"use client";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ExperienceCard } from "@/components/cards/experience-card";
import { experiences } from "@/data/experience";
import { sectionIds } from "@/lib/constants";

export function Experience() {
  return (
    <SectionWrapper id={sectionIds.experience} className="bg-muted/30">
      <Container>
        <SectionHeading
          title="Experience"
          subtitle="My professional journey so far"
        />
        <div className="mx-auto max-w-2xl">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company + exp.role} experience={exp} index={i} isLast={i === experiences.length - 1} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
