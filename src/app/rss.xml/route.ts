import { generateFeed } from '@/lib/feed';

export async function GET() {
  const feed = await generateFeed();
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
      'x-content-type-options': 'nosniff',
    },
  });
}
