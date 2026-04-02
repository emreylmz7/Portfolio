import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "clean-architecture-dotnet",
    title: "Why I Use Clean Architecture in Every .NET Project",
    description:
      "A practical guide to structuring .NET projects with Clean Architecture, CQRS, and MediatR for long-term maintainability.",
    image: "/images/blog/clean-architecture-dotnet.png",
    date: "2026-04-01",
    tags: [".NET", "Clean Architecture", "CQRS"],
    readingTime: "6 min read",
    published: true,
  },
];

export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
