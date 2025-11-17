import fs from 'fs';
import path from 'path';

import { loadBlogPosts } from './utils/content';

const baseUrl = 'https://thepushkarp.com';

function generateSitemap() {
  const distDir = path.join(process.cwd(), 'dist');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const staticRoutes = ['', '/blog', '/projects', '/misc', '/etymology', '/ai-log'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const posts = loadBlogPosts();

  const blogRoutes = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.lastModifiedAt || post.metadata.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    route => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml');

  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
  console.log('✅ Generated robots.txt');
}

generateSitemap();
