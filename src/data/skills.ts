import type { Skill, SkillCategory } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "C#", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "T-SQL", category: "languages" },
  { name: "HTML/CSS", category: "languages" },

  // Backend
  { name: ".NET 6+", category: "backend" },
  { name: "ASP.NET Core", category: "backend" },
  { name: "EF Core", category: "backend" },
  { name: "LINQ", category: "backend" },
  { name: "RESTful APIs", category: "backend" },
  { name: "RabbitMQ", category: "backend" },

  // Architecture
  { name: "Clean Architecture", category: "frontend" },
  { name: "CQRS Pattern", category: "frontend" },
  { name: "Microservices", category: "frontend" },
  { name: "DDD", category: "frontend" },

  // Database & Cache
  { name: "MSSQL", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Redis", category: "database" },
  { name: "Elasticsearch", category: "database" },

  // DevOps & Tools
  { name: "Docker", category: "devops" },
  { name: "Azure DevOps", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "CI/CD", category: "devops" },

  // Frontend & Testing
  { name: "Angular", category: "tools" },
  { name: "React", category: "tools" },
  { name: "xUnit", category: "tools" },
  { name: "NUnit", category: "tools" },
  { name: "Jira", category: "tools" },
];

export const skillCategoryLabels: Record<SkillCategory, string> = {
  languages: "Languages",
  backend: "Backend & Core",
  frontend: "Architecture",
  database: "Database & Cache",
  devops: "DevOps",
  tools: "Frontend & Testing Tools",
};
