import { TimeDisplay } from '@/components/TimeDisplay';
import IndexMdx from '@/app/index.mdx';
import { baseUrl } from '@/app/sitemap';

export const metadata = {
  title: 'pushkar patel',
  description: "pushkar's site",
  alternates: {
    canonical: `${baseUrl}/poems`,
  },
  openGraph: {
    title: 'pushkar patel',
    siteName: 'pushkar patel',
    description: "pushkar's site",
    type: 'article',
    url: `${baseUrl}/poems`,
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('pushkar patel')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pushkar patel',
    description: "pushkar's site",
    creator: '@thepushkarp',
    images: [`${baseUrl}/og?title=${encodeURIComponent('pushkar patel')}`],
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-col text-left">
      <h1 className="mb-8 font-semibold tracking-tighter">pushkar patel</h1>
      <TimeDisplay />
      <div className="flex flex-row">
        <section>
          <article className="prose prose-quoteless prose-neutral dark:prose-invert">
            <IndexMdx />
          </article>
        </section>
      </div>
    </main>
  );
}
