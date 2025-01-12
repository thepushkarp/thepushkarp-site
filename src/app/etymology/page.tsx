import { baseUrl } from '@/app/sitemap';
import EtymologyMdx from './etymology.mdx';

export const metadata = {
  title: 'etymology',
  description: 'word origins i found interesting',
  openGraph: {
    title: 'etymology',
    siteName: 'pushkar patel',
    description: 'word origins i found interesting',
    alternates: {
      canonical: `${baseUrl}/etymology`,
    },
    type: 'article',
    url: `${baseUrl}/etymology`,
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('etymology')}&subtitle=${encodeURIComponent('word origins i found interesting')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'etymology',
    description: 'word origins i found interesting',
    creator: '@thepushkarp',
    images: [
      `${baseUrl}/og?title=${encodeURIComponent('etymology')}&subtitle=${encodeURIComponent('word origins i found interesting')}`,
    ],
  },
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <EtymologyMdx />
      </article>
    </section>
  );
}
