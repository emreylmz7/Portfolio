"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { sectionIds } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AboutPreview() {
  return (
    <SectionWrapper id={sectionIds.about}>
      <Container>
        <SectionHeading
          title="About Me"
          subtitle="A quick overview of who I am and what I do"
        />
        <div className="mx-auto max-w-3xl space-y-4 text-center text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a <span className="font-medium text-foreground">Mid-Level Software Engineer</span> with 2+ years of experience
            specializing in the <span className="font-medium text-foreground">.NET ecosystem</span> and Microservices architecture.
            I build scalable backend systems using Clean Architecture, CQRS,
            and Domain-Driven Design.
          </p>
          <p>
            Experienced in optimizing API performance with Redis &amp;
            Elasticsearch and automating CI/CD pipelines via Azure DevOps.
            I&apos;m passionate about delivering maintainable, high-quality code
            for enterprise-level solutions.
          </p>
          <div className="pt-4">
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
