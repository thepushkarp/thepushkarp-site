import Image from 'next/image';

import IndexMdx from '@/app/index.mdx';
import { baseUrl } from '@/app/sitemap';
import { TimeDisplay } from '@/components/TimeDisplay';

export const metadata = {
  title: 'pushkar patel',
  description: "pushkar's site",
  alternates: {
    canonical: `${baseUrl}`,
  },
  openGraph: {
    title: 'pushkar patel',
    siteName: 'pushkar patel',
    description: "pushkar's site",
    type: 'article',
    url: `${baseUrl}`,
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
  const imgDimensions = {
    width: 128,
    height: 128,
  };

  return (
    <main className="flex flex-col text-left">
      <h1 className="mb-8 font-semibold tracking-tighter">pushkar patel</h1>
      <TimeDisplay />
      <div className="flex flex-row">
        <section className="w-full">
          <article className="prose relative">
            <div className="float-right ml-4 mb-4 w-[35%] max-w-[256px] min-w-[64px]">
              <Image
                src="/images/favicon.svg"
                alt="Pushkar"
                width={imgDimensions.width}
                height={imgDimensions.height}
                className="w-full h-auto"
              />
            </div>
            <IndexMdx />
          </article>
        </section>
      </div>
    </main>
  );
}
