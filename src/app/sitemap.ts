import { getBlogPosts } from '@/app/blog/utils';

export const baseUrl = 'https://thepushkarp.com';

export default async function sitemap() {
  let blogs = getBlogPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  let routes = ['', '/blog', '/projects', '/misc', '/etymology', '/poems'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes, ...blogs];
}
