import { TimeDisplay } from '@/components/TimeDisplay';
import { CustomMDX } from '@/components/mdx';
import { readMDXFile } from '@/app/blog/utils';
import path from 'path';
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
        url: `${baseUrl}/og?title=${encodeURIComponent('pushkar patel')}}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pushkar patel',
    description: "pushkar's site",
    creator: '@thepushkarp',
    images: [`${baseUrl}/og?title=${encodeURIComponent('pushkar patel')}}`],
  },
};

export default function HomePage() {
  const { content } = readMDXFile(path.join(process.cwd(), 'src', 'app', 'index.mdx'));

  return (
    <main className="flex flex-col text-left">
      <h1 className="mb-8 font-semibold tracking-tighter">pushkar patel</h1>
      <TimeDisplay />
      <div className="flex flex-row">
        <section>
          <article className="prose prose-quoteless prose-neutral dark:prose-invert">
            <CustomMDX source={content} />
          </article>
        </section>
      </div>
    </main>
  );
}
