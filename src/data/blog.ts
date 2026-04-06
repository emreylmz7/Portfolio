import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "redis-elasticsearch-api-performance",
    title: "How I Reduced API Response Times to Under 200ms with Redis and Elasticsearch",
    description:
      "A real-world case study on optimizing a travel booking platform's search performance using Redis caching and Elasticsearch indexing.",
    image: "/images/blog/Redis & Elasticsearch API Performance.png",
    date: "2026-04-06",
    tags: ["Redis", "Elasticsearch", ".NET", "Performance"],
    readingTime: "7 min read",
    published: true,
  },
  {
    slug: "rabbitmq-event-driven-dotnet",
    title: "Event-Driven Architecture with RabbitMQ in .NET Microservices",
    description:
      "How to decouple your microservices using RabbitMQ and MassTransit for reliable asynchronous communication.",
    image: "/images/blog/Event-Driven Architecture with RabbitMQ.png",
    date: "2026-04-04",
    tags: ["RabbitMQ", "Microservices", ".NET", "MassTransit"],
    readingTime: "8 min read",
    published: true,
  },
  {
    slug: "docker-dotnet-microservices",
    title: "Dockerizing .NET Microservices: A Practical Guide",
    description:
      "From multi-stage Dockerfiles to Docker Compose orchestration — everything you need to containerize your .NET microservices.",
    image: "/images/blog/Dockerizing .NET Microservices.png",
    date: "2026-04-03",
    tags: ["Docker", ".NET", "Microservices", "DevOps"],
    readingTime: "7 min read",
    published: true,
  },
  {
    slug: "cqrs-pattern-dotnet-guide",
    title: "Getting Started with CQRS Pattern in .NET Using MediatR",
    description:
      "A step-by-step guide to implementing Command Query Responsibility Segregation with MediatR and FluentValidation.",
    image: "/images/blog/CQRS Pattern with MediatR.png",
    date: "2026-04-02",
    tags: [".NET", "CQRS", "MediatR", "Architecture"],
    readingTime: "8 min read",
    published: true,
  },
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
