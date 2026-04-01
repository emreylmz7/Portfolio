"use client";

import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

const categories: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Mobile", value: "mobile" },
  { label: "Other", value: "other" },
];

interface ProjectFilterProps {
  activeCategory: ProjectCategory | "all";
  searchQuery: string;
  onCategoryChange: (category: ProjectCategory | "all") => void;
  onSearchChange: (query: string) => void;
}

export function ProjectFilter({
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: ProjectFilterProps) {
  return (
    <div className="mb-6 space-y-4 sm:mb-8">
      {/* Search */}
      <div className="relative mx-auto max-w-sm sm:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          >
            <Badge
              variant={activeCategory === cat.value ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-3 py-1.5 text-sm transition-colors",
                activeCategory === cat.value
                  ? ""
                  : "hover:bg-accent"
              )}
            >
              {cat.label}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
