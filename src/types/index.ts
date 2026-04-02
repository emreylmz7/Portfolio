// ── Project ──────────────────────────────────────────
export type ProjectCategory =
  | "fullstack"
  | "frontend"
  | "backend"
  | "mobile"
  | "other";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: ProjectCategory;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
}

// ── Skill ────────────────────────────────────────────
export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
}

// ── Experience ───────────────────────────────────────
export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

// ── Social Link ──────────────────────────────────────
export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "mail" | "twitter";
}

// ── Site Config ──────────────────────────────────────
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  email: string;
  formspreeId: string;
  resumeUrl: string;
}

// ── Navigation ───────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
}

// ── Blog Post ───────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  tags: string[];
  readingTime: string;
  published: boolean;
}

// ── Contact Form ─────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";
