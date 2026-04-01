"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { skills, skillCategoryLabels } from "@/data/skills";
import type { SkillCategory } from "@/types";
import { sectionIds } from "@/lib/constants";

export function Skills() {
  const categories = Object.keys(skillCategoryLabels) as SkillCategory[];

  return (
    <SectionWrapper id={sectionIds.skills}>
      <Container>
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with"
        />
        <div className="mx-auto max-w-3xl space-y-8">
          {categories.map((category, catIdx) => {
            const categorySkills = skills.filter((s) => s.category === category);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6"
              >
                <h3 className="w-full shrink-0 text-sm font-medium text-muted-foreground sm:w-40 sm:pt-1">
                  {skillCategoryLabels[category]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
