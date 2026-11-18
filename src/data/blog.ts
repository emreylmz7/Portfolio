import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n';

// Posts live in src/content/blog/<lang>/<slug>.md. The same file name in both
// folders makes the two files translations of each other.
export type Post = CollectionEntry<'blog'>;

export const postLang = (post: Post) => post.id.split('/')[0] as Lang;
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');

/** Published posts in one language, newest first. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection('blog', (post) => !post.data.draft && postLang(post) === lang);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Whether the post also exists in the other language. */
export async function hasTranslation(post: Post, other: Lang): Promise<boolean> {
  const posts = await getPosts(other);
  return posts.some((p) => postSlug(p) === postSlug(post));
}
