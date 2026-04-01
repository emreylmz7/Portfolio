import type { Project } from "@/types";

function ghImage(repo: string) {
  return `https://opengraph.githubassets.com/1/emreylmz7/${repo}`;
}

export const projects: Project[] = [
  {
    slug: "hi-travel-booking",
    title: "Hi Travel Booking Platform",
    description:
      "Full-featured travel booking platform for tours, hotels, and villas across Turkey — handling 10,000+ daily users with .NET 8, CQRS, Redis, and Elasticsearch.",
    longDescription:
      "Built the core backend for hitravel.com.tr, a travel marketplace serving 10,000+ daily users. Implemented CQRS pattern, Redis caching, and Elasticsearch for sub-200ms API responses. Integrated Stripe/PayPal payments and automated CI/CD via Azure DevOps.",
    image: "/images/hilogo.jpg",
    category: "fullstack",
    tags: [".NET 8", "CQRS", "Redis", "Elasticsearch", "Angular", "Azure DevOps"],
    liveUrl: "https://hitravel.com.tr/tr",
    featured: true,
    date: "2025-02-01",
  },
  {
    slug: "ecommerce-microservices",
    title: "E-Commerce Microservices Platform",
    description:
      "Scalable e-commerce platform built with ASP.NET Core featuring microservices architecture and payment integration.",
    image: ghImage("ECommerceApp"),
    category: "fullstack",
    tags: ["ASP.NET Core", "Microservices", "Docker", "HTML", "CSS"],
    githubUrl: "https://github.com/emreylmz7/ECommerceApp",
    featured: true,
    date: "2024-10-24",
  },
  {
    slug: "clean-architecture-setup",
    title: "Clean Architecture Setup",
    description:
      "A modern Clean Architecture template — scalable, maintainable, and testable with .NET Aspire and Scalar.",
    image: ghImage("CleanArchitectureSetup"),
    category: "backend",
    tags: ["C#", ".NET", "Clean Architecture", "Aspire", "Scalar"],
    githubUrl: "https://github.com/emreylmz7/CleanArchitectureSetup",
    featured: true,
    date: "2025-02-13",
  },
  {
    slug: "rabbitmq-order-app",
    title: "RabbitMQ Order Processing",
    description:
      "Asynchronous order processing system using RabbitMQ within a microservices architecture.",
    image: ghImage("RabbitMQOrderApp"),
    category: "backend",
    tags: ["C#", ".NET", "RabbitMQ", "Microservices", "Docker"],
    githubUrl: "https://github.com/emreylmz7/RabbitMQOrderApp",
    featured: true,
    date: "2024-10-24",
  },
  {
    slug: "erp-app-server",
    title: "Modular ERP System",
    description:
      "Comprehensive ERP system demonstrating modular and scalable architecture with .NET Core.",
    image: ghImage("ERPAppServer"),
    category: "fullstack",
    tags: ["C#", ".NET Core", "ERP", "MSSQL", "Clean Architecture"],
    githubUrl: "https://github.com/emreylmz7/ERPAppServer",
    featured: true,
    date: "2024-12-12",
  },
  {
    slug: "car-booking-app",
    title: "Car Booking Rental App",
    description:
      "ASP.NET Core Web API for managing vehicle rentals with booking system and fleet management.",
    image: ghImage("CarBookingApp"),
    category: "fullstack",
    tags: ["ASP.NET Core", "Web API", "HTML", "CSS", "MSSQL"],
    githubUrl: "https://github.com/emreylmz7/CarBookingApp",
    featured: false,
    date: "2024-09-07",
  },
  {
    slug: "elasticsearch-blog",
    title: "Elasticsearch Blog API",
    description:
      "Minimal .NET 9 Web API for managing blog posts with Elasticsearch integration.",
    image: ghImage("ElasticSearchBlog"),
    category: "backend",
    tags: ["C#", ".NET 9", "Elasticsearch", "Minimal API"],
    githubUrl: "https://github.com/emreylmz7/ElasticSearchBlog",
    featured: false,
    date: "2025-02-20",
  },
  {
    slug: "iot-thermal-monitor",
    title: "IoT Thermal Monitor",
    description:
      "IoT-based thermal monitoring system built with C# for real-time temperature data collection.",
    image: ghImage("IoT-Thermal-Monitor"),
    category: "other",
    tags: ["C#", "IoT", "Real-time", "Monitoring"],
    githubUrl: "https://github.com/emreylmz7/IoT-Thermal-Monitor",
    featured: false,
    date: "2026-01-27",
  },
  {
    slug: "ai-quiz-app",
    title: "AI Quiz App (Quizfy)",
    description:
      "React-based quiz application powered by Gemini AI for dynamic quiz generation.",
    image: ghImage("AIQuizApp"),
    category: "frontend",
    tags: ["React", "JavaScript", "Gemini AI", "CSS"],
    githubUrl: "https://github.com/emreylmz7/AIQuizApp",
    featured: false,
    date: "2024-11-26",
  },
  {
    slug: "hotel-app",
    title: "Hotel Management System",
    description:
      ".NET Core 7 hotel management API with customer management and room booking.",
    image: ghImage("HotelApp"),
    category: "fullstack",
    tags: [".NET Core 7", "Web API", "JavaScript", "MSSQL"],
    githubUrl: "https://github.com/emreylmz7/HotelApp",
    featured: false,
    date: "2024-09-07",
  },
  {
    slug: "job-application-app",
    title: "Job Application Platform",
    description:
      ".NET Core MVC and API-based platform for job listings and candidate management.",
    image: ghImage("JobApplicationApp"),
    category: "fullstack",
    tags: ["C#", ".NET Core MVC", "Web API", "MSSQL"],
    githubUrl: "https://github.com/emreylmz7/JobApplicationApp",
    featured: false,
    date: "2024-09-07",
  },
  {
    slug: "medical-dictionary",
    title: "Medical Dictionary App",
    description:
      "Modern Android app for medical students to search and explore medical terms.",
    image: ghImage("MedicalDictionary"),
    category: "mobile",
    tags: ["Kotlin", "Android", "Mobile", "UI/UX"],
    githubUrl: "https://github.com/emreylmz7/MedicalDictionary",
    featured: false,
    date: "2025-01-08",
  },
];
