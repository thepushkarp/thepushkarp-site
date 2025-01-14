import { Feed } from 'feed';

import { getBlogPosts } from '@/app/blog/utils';
import { baseUrl } from '@/app/sitemap';

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const feed = new Feed({
    title: escapeXml("pushkar patel's blog"),
    description: escapeXml('some thoughts, some ideas, some rants, some code'),
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    favicon: `${baseUrl}/favicon.ico`,
    image: `${baseUrl}/og?title=${encodeURIComponent('pushkar patel')}`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Pushkar Patel`,
    updated: new Date(),
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/rss`,
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
  const posts = await getBlogPosts();
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

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
      'x-content-type-options': 'nosniff',
    },
  });
}
