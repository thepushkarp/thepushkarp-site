import { baseUrl } from '@/app/sitemap';

export async function GET() {
  // TODO: add blogposts

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>blog | pushkar patel</title>
        <link>${baseUrl}/blog</link>
        <description>rss feed of pushkar\'s blog</description>
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
