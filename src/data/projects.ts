import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "capitalist-panel",
    title: "Capitalist — ERP Finance Panel",
    description:
      "Advanced web-based reporting and finance dashboard fully integrated with Bay.t ERP for real-time profitability analysis and business intelligence.",
    longDescription:
      "A comprehensive finance and reporting panel built as a companion analytics layer on top of Bay.t ERP. Features real-time dashboard with revenue, orders, collections, and net cash flow metrics. Includes three-dimensional profitability analysis (product, customer, and invoice level), aging reports for overdue receivables, current account management, check/promissory note portfolio tracking, order monitoring, dispatch note integration, and sales rep performance tracking. All reports are exportable to PDF and Excel. Role-based access control ensures employees see only the data relevant to their role.",
    image: "/images/projects/capitalist/1.PNG",
    category: "fullstack",
    tags: [".NET", "ERP", "Finance", "Real-time", "Reporting"],
    featured: true,
    date: "2025-06-01",
  },
  {
    slug: "hi-travel-booking",
    title: "Hi Travel Booking Platform",
    description:
      "Full-featured travel booking platform for tours, hotels, and villas across Turkey — handling 10,000+ daily users with .NET 8, CQRS, Redis, and Elasticsearch.",
    longDescription:
      "Built the core backend for hitravel.com.tr, a travel marketplace serving 10,000+ daily users. Implemented CQRS pattern, Redis caching, and Elasticsearch for sub-200ms API responses. Integrated Stripe/PayPal payments and automated CI/CD via Azure DevOps.",
    image: "/images/projects/hitravel/1.jpg",
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
    longDescription:
      "A full-scale e-commerce platform designed with microservices architecture using ASP.NET Core. Each service — product catalog, order management, user authentication, and payment — runs independently in Docker containers. Implemented inter-service communication, centralized logging, and a responsive frontend for browsing products, managing carts, and processing orders.",
    image: "/images/projects/e-commerce/1.png",
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
    longDescription:
      "A production-ready Clean Architecture template for .NET projects, designed to accelerate development with best practices baked in. Features layered separation (Domain, Application, Infrastructure, Presentation), CQRS with MediatR, FluentValidation, and .NET Aspire for orchestration. Includes Scalar for interactive API documentation, making it easy to explore and test endpoints out of the box.",
    image: "/images/projects/clean architectuıre/b603d90e-5b52-44e9-9cd9-32aff1e8a7a5.png",
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
    longDescription:
      "An event-driven order processing system demonstrating asynchronous communication between microservices using RabbitMQ. When a customer places an order, the message is published to a queue and consumed by independent services for validation, inventory check, and fulfillment. Built with .NET and Docker, showcasing reliable message delivery, retry mechanisms, and decoupled service architecture.",
    image: "/images/projects/rabbitmq/Gemini_Generated_Image_jur9iijur9iijur9s.png",
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
    longDescription:
      "A comprehensive ERP system built with .NET Core following Clean Architecture and modular design principles. Covers core business modules including inventory management, invoicing, customer relations, and reporting. Each module is self-contained with its own domain logic, making the system easy to extend. Uses MSSQL for data persistence and implements role-based access control for multi-user environments.",
    image: "/images/projects/erp/7ad3390d-ea83-4098-9192-09e6d7313879.png",
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
    longDescription:
      "A vehicle rental management system built with ASP.NET Core Web API. Features include vehicle listing with availability filters, date-based booking with conflict detection, customer management, and fleet tracking. The backend exposes RESTful endpoints consumed by a frontend built with HTML/CSS. Uses MSSQL for storing vehicle, booking, and customer data with relational integrity.",
    image: "/images/projects/carbook/mock01.5542508f46bf4454f376.png",
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
    longDescription:
      "A minimal Web API built with .NET 9 that demonstrates full-text search capabilities using Elasticsearch. Supports creating, updating, and querying blog posts with fast, relevance-ranked search results. Implements Elasticsearch indexing strategies, custom analyzers, and fuzzy matching to deliver accurate search even with typos. Designed as a lightweight reference for integrating Elasticsearch into .NET projects.",
    image: "/images/projects/elasticsearch/1cb8bbdc-f608-41b3-8f34-f5611e6a0997.png",
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
    longDescription:
      "A real-time thermal monitoring system that collects temperature data from IoT sensors and visualizes it through a dashboard. Built with C#, the application handles continuous data streams, stores historical readings, and triggers alerts when temperatures exceed defined thresholds. Demonstrates working with hardware interfaces, real-time data processing, and time-series visualization.",
    image: "/images/projects/iot-thermal/b17d2fee-5ae7-47f1-90fb-56448667151c.png",
    category: "other",
    tags: ["C#", "IoT", "Real-time", "Monitoring"],
    githubUrl: "https://github.com/emreylmz7/IoT-Thermal-Monitor",
    featured: false,
    date: "2026-01-27",
  },
  {
    slug: "ai-quiz-app",
    title: "Quizify — AI Quiz App",
    description:
      "Interactive quiz app powered by Google Gemini 2.5 Flash AI with dynamic question generation, customizable topics, and performance analytics.",
    longDescription:
      "An AI-powered quiz application built with React 18 that leverages Google Gemini 2.5 Flash to dynamically generate multiple-choice questions on any topic. Users can choose from suggested topics or enter custom ones, select the number of questions (5, 10, or 15), and get instant feedback on each answer. Features include circular score indicators, detailed result summaries with performance analytics, and a modern dark-themed UI with glassmorphism styling. Fully responsive for both mobile and desktop.",
    image: "/images/projects/quiz-app/mock03.fc140bf47495d99c7585.png",
    category: "frontend",
    tags: ["React 18", "Gemini AI", "Bootstrap 5", "JavaScript"],
    githubUrl: "https://github.com/emreylmz7/AIQuizApp",
    liveUrl: "https://letquizify.netlify.app",
    featured: false,
    date: "2024-11-26",
  },
  {
    slug: "hotel-app",
    title: "Hotel Management System",
    description:
      ".NET Core 7 hotel management API with customer management and room booking.",
    longDescription:
      "A hotel management system built with .NET Core 7 Web API for handling room reservations, guest check-in/check-out, and customer profiles. Features room availability checking with date-range queries, pricing management, and booking confirmation workflows. The API is consumed by a JavaScript frontend that provides an intuitive interface for both hotel staff and guests.",
    image: "/images/projects/hotelapp/mock02.b7b671a0fdec3bff8141.png",
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
    longDescription:
      "A job application platform built with .NET Core MVC and Web API where employers can post job listings and candidates can browse, filter, and apply. Features include job search with category and location filters, application tracking for candidates, and a management dashboard for employers to review applicants. Uses MSSQL for data storage with Entity Framework Core.",
    image: "/images/projects/job-application/3c2ba033-89fc-4f7f-b501-0e182f2698da.png",
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
    longDescription:
      "A native Android application built with Kotlin for medical students and healthcare professionals to quickly search and explore medical terminology. Features instant search with autocomplete, detailed term definitions with related terms, bookmarking for frequently referenced entries, and an offline-first architecture so content is accessible without an internet connection. Designed with Material Design principles for a clean, intuitive user experience.",
    image: "/images/projects/medical-dictionary/0628f6a2-0f9d-43fb-81fe-e4a8816b9c0c.png",
    category: "mobile",
    tags: ["Kotlin", "Android", "Mobile", "UI/UX"],
    githubUrl: "https://github.com/emreylmz7/MedicalDictionary",
    featured: false,
    date: "2025-01-08",
  },
];
