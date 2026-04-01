"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectFilter } from "@/components/shared/project-filter";
import { ProjectCard } from "@/components/cards/project-card";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/types";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Explore my portfolio of web development projects, from full-stack applications to frontend experiments."
      />
      <section className="py-10 sm:py-16">
        <Container>
          <ProjectFilter
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onCategoryChange={setActiveCategory}
            onSearchChange={setSearchQuery}
          />

          {filtered.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                No projects found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-2 text-sm text-primary underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
