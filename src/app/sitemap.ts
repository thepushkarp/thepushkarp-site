import fs from 'fs';
import path from 'path';

import { getBlogPosts } from '@/app/blog/utils';

export const baseUrl = 'https://thepushkarp.com';

export default async function sitemap() {
  // Static routes
  const staticRoutes = ['', '/blog', '/projects', '/misc', '/etymology', '/learning', '/ai-log'].map(route => ({
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

  // Learning slugs
  const learningDir = path.join(process.cwd(), 'src', 'app', 'learning');
  const learningFiles = fs.readdirSync(learningDir).filter(file => file.endsWith('.mdx') && file !== 'learning.mdx');

  const learningRoutes = learningFiles.map(file => {
    const slug = file.replace('.mdx', '');
    const filePath = path.join(learningDir, file);
    const stats = fs.statSync(filePath);
    return {
      url: `${baseUrl}/learning/${slug}`,
      lastModified: stats.mtime.toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...blogRoutes, ...learningRoutes];
}
