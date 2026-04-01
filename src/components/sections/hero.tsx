"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Send } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/data/site-config";
import { sectionIds } from "@/lib/constants";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section id={sectionIds.hero} className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-primary/8 blur-[100px] [animation-delay:2s]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-chart-2/6 blur-[100px] [animation-delay:4s]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {siteConfig.name.split(" ").slice(1).join(" ")}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-lg font-medium sm:text-xl md:text-2xl"
          >
            <span className="text-muted-foreground">Software Engineer specializing in </span>
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">.NET, Microservices &amp; Clean Architecture</span>
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            Building scalable backend systems with CQRS, DDD, and enterprise-grade
            architecture. Passionate about delivering maintainable, high-quality code.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
          >
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ size: "default" }),
                "sm:w-auto"
              )}
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline", size: "default" }), "sm:w-auto")}
            >
              <Send className="mr-2 h-4 w-4" />
              Get In Touch
            </Link>
            <a
              href={siteConfig.resumeUrl}
              download
              className={cn(buttonVariants({ variant: "ghost", size: "default" }), "sm:w-auto")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex justify-center">
            <SocialLinks />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
