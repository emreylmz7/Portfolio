"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-border/50 py-16 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">{description}</p>
        </motion.div>
      </Container>
    </section>
  );
}
