import { generateFeed } from '@/lib/feed';

export async function GET() {
  const feed = await generateFeed();
  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
      'x-content-type-options': 'nosniff',
    },
  });
}
