import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const baseUrl = 'https://thepushkarp.com';

function generateSitemap() {
  const distDir = path.join(process.cwd(), 'dist');

  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Static routes
  const staticRoutes = ['', '/blog', '/projects', '/misc', '/etymology', '/ai-log'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Blog posts
  const postsDir = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

  const blogRoutes = filenames.map(filename => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      url: `${baseUrl}/blog/${data.slug}`,
      lastModified: data.lastModifiedAt || data.publishedAt,
      changeFrequency: 'weekly',
      priority: 0.6,
    };
  });

  const allRoutes = [...staticRoutes, ...blogRoutes];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    route => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml');

  // Generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
  console.log('✅ Generated robots.txt');
}

generateSitemap();
