"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-border/50 bg-card/50">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <CardContent className="p-4 sm:p-5">
          {/* Category */}
          <Badge variant="outline" className="mb-3 text-xs capitalize">
            {project.category === "fullstack" ? "Full-Stack" : project.category}
          </Badge>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold tracking-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "text-xs")}
              >
                <GitFork className="mr-1.5 h-3.5 w-3.5" />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                className={cn(buttonVariants({ size: "sm" }), "text-xs")}
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
