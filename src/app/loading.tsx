import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <Skeleton className="mx-auto h-10 w-64" />
            <Skeleton className="mx-auto mt-4 h-5 w-96" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
