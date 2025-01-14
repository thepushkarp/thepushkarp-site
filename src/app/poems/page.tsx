import { baseUrl } from '@/app/sitemap';
import PoemsMdx from './poems.mdx';

export const metadata = {
  title: 'poems',
  description: 'poems that i liked reading',
  alternates: {
    canonical: `${baseUrl}/poems`,
  },
  openGraph: {
    title: 'poems',
    siteName: 'pushkar patel',
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

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <article className="prose">
        <PoemsMdx />
      </article>
    </section>
  );
}
