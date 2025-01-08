import { TimeDisplay } from '@/components/TimeDisplay';
import { CustomMDX } from '@/components/mdx';
import { readMDXFile } from '@/app/blog/utils';
import path from 'path';
import { baseUrl } from '@/app/sitemap';

export const metadata = {
  title: 'poems',
  description: 'poems that i liked reading',
  alternates: {
    canonical: `${baseUrl}/poems`,
  },
  openGraph: {
    title: 'poems',
    description: 'poems that i liked reading',
    type: 'article',
    url: `${baseUrl}/poems`,
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('poems')}&subtitle=${encodeURIComponent('poems that i liked reading')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'poems',
    description: 'poems that i liked reading',
    creator: '@thepushkarp',
    images: [
      `${baseUrl}/og?title=${encodeURIComponent('poems')}&subtitle=${encodeURIComponent('poems that i liked reading')}`,
    ],
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
