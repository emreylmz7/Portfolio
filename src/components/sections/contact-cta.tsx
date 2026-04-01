"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { sectionIds } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ContactCta() {
  return (
    <SectionWrapper id={sectionIds.contact}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Let&apos;s Work Together
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Have a project in mind or looking for a developer to join your team?
            I&apos;d love to hear from you.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <Send className="mr-2 h-4 w-4" />
              Get In Touch
            </Link>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
