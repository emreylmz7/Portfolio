import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Lightbulb, Users, Zap, GraduationCap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.name} — a Software Engineer specializing in .NET, Microservices, and Clean Architecture.`,
};

const values = [
  {
    icon: Code2,
    title: "Clean Architecture",
    description:
      "I design systems using Clean Architecture, CQRS, and DDD — building maintainable, testable, and scalable codebases.",
  },
  {
    icon: Zap,
    title: "Performance Driven",
    description:
      "From Redis caching to Elasticsearch optimization, I focus on building APIs that respond in under 200ms at scale.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Experienced with Agile/Scrum workflows, code reviews, and cross-functional team collaboration in enterprise environments.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learner",
    description:
      "Always exploring new patterns and technologies — from microservices to event-driven architecture — to deliver better solutions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Me"
        description="Get to know the developer behind the code."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Bio */}
            <div className="space-y-5 text-muted-foreground">
              <p className="text-lg">
                Hi, I&apos;m <span className="font-semibold text-foreground">{siteConfig.name}</span> — a
                Mid-Level Software Engineer with 2+ years of experience specializing
                in the .NET ecosystem and Microservices architecture.
              </p>
              <p>
                I graduated from Suleyman Demirel University with a degree in Computer
                Engineering in 2023. Since then, I&apos;ve been building scalable backend
                systems using Clean Architecture, CQRS, and Domain-Driven Design for
                enterprise clients across travel, e-commerce, and ERP domains.
              </p>
              <p>
                My experience spans the full development lifecycle — from designing
                microservices architectures and optimizing database performance to
                integrating payment gateways and automating CI/CD pipelines with
                Docker and Azure DevOps. I&apos;ve worked on systems handling 10,000+
                daily users and consistently focused on reducing API response times
                and improving conversion rates.
              </p>
              <p>
                I&apos;m passionate about writing clean, maintainable code and staying
                current with modern software patterns. Whether it&apos;s implementing
                event-driven communication with RabbitMQ or optimizing search with
                Elasticsearch, I bring the same dedication to every project.
              </p>
            </div>

            {/* Values */}
            <div className="mt-16">
              <h2 className="mb-8 text-2xl font-bold tracking-tight">
                What I Bring to the Table
              </h2>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="rounded-xl border border-border/50 bg-card/30 p-4 sm:p-6"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <value.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="mt-16">
              <h2 className="mb-4 text-2xl font-bold tracking-tight">
                Career Goals
              </h2>
              <p className="text-muted-foreground">
                I&apos;m focused on deepening my expertise in Microservices architecture
                and distributed systems while expanding into cloud-native development
                with Azure. My goal is to architect enterprise-grade solutions that
                handle scale gracefully and to grow into a senior engineering role
                where I can mentor others and drive technical decisions.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="mb-4 text-muted-foreground">
                Interested in working together? I&apos;d love to hear from you.
              </p>
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
