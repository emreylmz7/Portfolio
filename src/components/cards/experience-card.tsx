"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isLast: boolean;
}

export function ExperienceCard({ experience, index, isLast }: ExperienceCardProps) {
  const isPresent = experience.endDate === "Present";

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="relative pl-10"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5">
        <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${isPresent ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
          <div className={`h-2 w-2 rounded-full ${isPresent ? "bg-primary" : "bg-muted-foreground/40"}`} />
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-border/50 bg-card/30 p-4 sm:mb-8 sm:p-5">
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold">{experience.role}</h3>
            {experience.companyUrl ? (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary/80 underline-offset-4 hover:underline"
              >
                {experience.company}
              </a>
            ) : (
              <p className="text-sm text-primary/80">{experience.company}</p>
            )}
          </div>
          <Badge variant="outline" className="text-xs shrink-0">
            {experience.startDate} — {experience.endDate}
          </Badge>
        </div>

        {/* Description */}
        <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
          {experience.description}
        </p>

        {/* Achievements */}
        <ul className="mb-4 space-y-1">
          {experience.achievements.map((achievement, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
              {achievement}
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-primary/8 px-2 py-0.5 text-xs text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
