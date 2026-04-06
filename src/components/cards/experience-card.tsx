"use client";

import { motion } from "framer-motion";
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-1.25 top-3 bottom-0 w-px bg-border/60" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-2">
        <div
          className={`h-3 w-3 rounded-full ${
            isPresent
              ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.4)]"
              : "bg-muted-foreground/30"
          }`}
        />
      </div>

      <div className={`${isLast ? "pb-0" : "pb-10"}`}>
        {/* Date */}
        <p className="mb-1 text-xs text-muted-foreground">
          {experience.startDate} — {experience.endDate}
        </p>

        {/* Role & Company */}
        <h3 className="text-base font-semibold tracking-tight sm:text-lg">
          {experience.role}
        </h3>
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

        {/* Key achievements — compact */}
        <ul className="mt-3 space-y-1.5">
          {experience.achievements.map((achievement, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
              {achievement}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
