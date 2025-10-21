import fs from 'fs';
import path from 'path';

import { Feed } from 'feed';
import matter from 'gray-matter';

const baseUrl = 'https://thepushkarp.com';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateFeeds() {
  const distDir = path.join(process.cwd(), 'dist');

  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const feed = new Feed({
    title: escapeXml("pushkar patel's blog"),
    description: escapeXml('some thoughts, some ideas, some rants, some code'),
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    favicon: `${baseUrl}/favicon.ico`,
    image: `${baseUrl}/images/og-default.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Pushkar Patel`,
    updated: new Date(),
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
      atom: `${baseUrl}/atom.xml`,
      json: `${baseUrl}/feed.json`,
    },
    author: {
      name: 'Pushkar Patel',
      link: baseUrl,
    },
  });

  // Add homepage
  feed.addItem({
    title: escapeXml('pushkar patel'),
    id: baseUrl,
    link: baseUrl,
    description: escapeXml("pushkar's site"),
    date: new Date(),
  });

  // Add blog index
  feed.addItem({
    title: escapeXml('blog | pushkar patel'),
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    description: escapeXml('some thoughts, some ideas, some rants, some code'),
    date: new Date(),
  });

  // Add blog posts
  const postsDir = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

  const posts = filenames.map(filename => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug: data.slug,
      metadata: {
        title: data.title,
        publishedAt: data.publishedAt,
        subtitle: data.subtitle,
        lastModifiedAt: data.lastModifiedAt,
        tags: data.tags,
      },
      content,
    };
  });

  // Sort by date (newest first)
  posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  for (const post of posts) {
    feed.addItem({
      title: escapeXml(post.metadata.title),
      id: `${baseUrl}/blog/${post.slug}`,
      link: `${baseUrl}/blog/${post.slug}`,
      description: escapeXml(post.metadata.subtitle),
      content: post.content,
      author: [
        {
          name: 'Pushkar Patel',
          link: baseUrl,
        },
      ],
      date: new Date(post.metadata.publishedAt),
      ...(post.metadata.lastModifiedAt && {
        modified: new Date(post.metadata.lastModifiedAt),
      }),
      ...(post.metadata.tags && {
        category: post.metadata.tags.map((tag: string) => ({ name: escapeXml(tag) })),
      }),
    });
  }

  // Generate feeds
  fs.writeFileSync(path.join(distDir, 'rss.xml'), feed.rss2());
  fs.writeFileSync(path.join(distDir, 'atom.xml'), feed.atom1());
  fs.writeFileSync(path.join(distDir, 'feed.json'), feed.json1());

  console.log('✅ Generated RSS, Atom, and JSON feeds');
}

generateFeeds();
