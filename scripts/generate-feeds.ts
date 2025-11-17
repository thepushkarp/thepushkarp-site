import fs from 'fs';
import path from 'path';

import { Feed } from 'feed';

import { loadBlogPosts } from './utils/content';

const baseUrl = 'https://thepushkarp.com';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateFeeds() {
  const distDir = path.join(process.cwd(), 'dist');
  const publicDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
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

  feed.addItem({
    title: escapeXml('pushkar patel'),
    id: baseUrl,
    link: baseUrl,
    description: escapeXml("pushkar's site"),
    date: new Date(),
  });

  feed.addItem({
    title: escapeXml('blog | pushkar patel'),
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    description: escapeXml('some thoughts, some ideas, some rants, some code'),
    date: new Date(),
  });

  const posts = loadBlogPosts();

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
        category: post.metadata.tags.map(tag => ({ name: escapeXml(tag) })),
      }),
    });
  }

  const rssContent = feed.rss2();
  const atomContent = feed.atom1();
  const jsonContent = feed.json1();

  // Write to dist directory (for production builds)
  fs.writeFileSync(path.join(distDir, 'rss.xml'), rssContent);
  fs.writeFileSync(path.join(distDir, 'atom.xml'), atomContent);
  fs.writeFileSync(path.join(distDir, 'feed.json'), jsonContent);

  // Write to public directory (for dev server)
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssContent);
  fs.writeFileSync(path.join(publicDir, 'atom.xml'), atomContent);
  fs.writeFileSync(path.join(publicDir, 'feed.json'), jsonContent);

  console.log('✅ Generated RSS, Atom, and JSON feeds in dist/ and public/');
}

generateFeeds();
