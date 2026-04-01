"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/types";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-sm"
    >
      {skill.name}
    </motion.div>
  );
}
