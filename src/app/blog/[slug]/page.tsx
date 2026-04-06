import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { blogPosts } from "@/data/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts
    .filter((p) => p.published)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.published);

  if (!post) notFound();

  const { default: PostContent } = await import(
    `@/content/blog/${slug}.mdx`
  );

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: `https://vemreyilmaz.com${post.image}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "Veysel Emre Yılmaz",
        url: "https://vemreyilmaz.com",
      },
      publisher: {
        "@type": "Person",
        name: "Veysel Emre Yılmaz",
      },
      mainEntityOfPage: `https://vemreyilmaz.com/blog/${slug}`,
      keywords: post.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vemreyilmaz.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://vemreyilmaz.com/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: `https://vemreyilmaz.com/blog/${slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-10 sm:py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl px-1 sm:px-0">
            {/* Back link */}
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Cover image */}
          <div className="relative -mx-1 mb-6 aspect-video overflow-hidden rounded-lg border border-border/50 bg-muted sm:mx-0 sm:mb-8 sm:rounded-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 720px"
              priority
            />
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:mb-4 sm:text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {post.readingTime}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {post.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground sm:px-2.5 sm:py-1 sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose">
            <PostContent />
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
