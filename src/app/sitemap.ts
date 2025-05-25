import { getBlogPosts } from '@/app/blog/utils';

export const baseUrl = 'https://thepushkarp.com';

export default async function sitemap() {
  // Static routes
  const staticRoutes = ['', '/blog', '/projects', '/misc', '/etymology', '/ai-log'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Blog posts
  const posts = await getBlogPosts();
  const blogRoutes = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.lastModifiedAt || post.metadata.publishedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
