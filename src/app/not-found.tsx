import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-8rem)] items-center overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <FileQuestion className="h-10 w-10 text-primary" />
          </div>
          <h1 className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            404
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This page doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
