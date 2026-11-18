import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postSlug } from '@/data/blog';
import { site } from '@/data/site';
import { href } from '@/i18n';

export async function GET(context: APIContext) {
  // The feed carries the English posts; the Turkish ones are linked from /blog.
  const posts = await getPosts('en');

  return rss({
    title: `${site.name} — Writing`,
    description: 'Notes on .NET, architecture and performance, written from real projects.',
    site: context.site ?? site.url,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: href('en', `/blog/${postSlug(post)}`),
    })),
  });
}
