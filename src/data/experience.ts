import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Dotlantis",
    role: "Mid-Level Software Engineer",
    startDate: "May 2025",
    endDate: "Present",
    description:
      "Designing and implementing scalable full-stack modules for enterprise clients using .NET Core and Clean Architecture.",
    achievements: [
      "Applying Domain-Driven Design (DDD) to transform complex business needs into scalable applications",
      "Developing high-scale e-commerce platforms and custom automation tools from the ground up",
      "Integrating multi-vendor payment gateways and complex accounting software",
      "Automating deployment cycles using Docker and Azure DevOps",
    ],
    technologies: [".NET Core", "Clean Architecture", "DDD", "Docker", "Azure DevOps"],
  },
  {
    company: "Hi Travel",
    role: "Software Engineer (Part-Time)",
    startDate: "Feb 2025",
    endDate: "Present",
    description:
      "Building high-performance backend systems with .NET 8 and CQRS, handling 10,000+ daily users.",
    achievements: [
      "Reduced API response times to <200ms by integrating Redis and Elasticsearch",
      "Optimized booking processes, achieving a 35% conversion rate improvement",
      "Automated CI/CD pipelines via GitHub Actions and Azure DevOps",
      "Developed responsive Angular/PWA components for enhanced user experience",
    ],
    technologies: [".NET 8", "CQRS", "Redis", "Elasticsearch", "Angular", "Azure DevOps"],
  },
  {
    company: "Mutlu Yazılım",
    role: "Software Engineer",
    startDate: "Nov 2023",
    endDate: "Aug 2024",
    description:
      "Developed scalable web applications using .NET Core and ASP.NET MVC for various client projects.",
    achievements: [
      "Developed scalable web applications using .NET Core and ASP.NET MVC",
      "Optimized MSSQL database designs to improve system communication and performance",
      "Built modern, responsive UIs using Angular/React and TypeScript",
    ],
    technologies: [".NET Core", "ASP.NET MVC", "MSSQL", "Angular", "React", "TypeScript"],
  },
  {
    company: "Shipentegra",
    role: "Software Development Intern",
    startDate: "Aug 2023",
    endDate: "Sep 2023",
    description:
      "Contributed to e-commerce web development projects, building interfaces with React and Angular.",
    achievements: [
      "Developed e-commerce web pages using React and Angular",
      "Assisted in designing user-friendly interfaces and enhancing user experience",
    ],
    technologies: ["React", "Angular", "JavaScript"],
    companyUrl: "https://shipentegra.com",
  },
];
