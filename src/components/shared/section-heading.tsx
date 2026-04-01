import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 sm:mb-10 md:mb-14 text-center", className)}>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary/60" />
    </div>
  );
}
