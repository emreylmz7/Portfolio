import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { getPublishedPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles on .NET, Clean Architecture, microservices, and software engineering.",
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <PageHeader
        title="Blog"
        description="Technical articles and notes on software engineering."
      />
      <section className="py-8 sm:py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {posts.length > 0 ? (
              <div className="divide-y divide-border/50">
                {posts.map((post) => (
                  <article key={post.slug} className="py-6 first:pt-0 last:pb-0 sm:py-8">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <div className="flex items-start gap-5 sm:gap-6 md:gap-8">
                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          {/* Meta */}
                          <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground sm:text-sm">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              {post.readingTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="mb-1.5 text-base font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-lg md:text-xl">
                            {post.title}
                          </h2>

                          {/* Description — hidden on very small screens when image is shown */}
                          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:line-clamp-3">
                            {post.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-secondary px-1.5 py-0.5 text-[11px] text-secondary-foreground sm:px-2 sm:text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Thumbnail */}
                        <div className="relative hidden shrink-0 overflow-hidden rounded-lg bg-muted sm:block sm:h-24 sm:w-36 md:h-28 md:w-44">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 144px, 192px"
                          />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">
                  No posts yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
