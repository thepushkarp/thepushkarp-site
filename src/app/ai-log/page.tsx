import AiLogMdx from './ai-log.mdx';

import { baseUrl } from '@/app/sitemap';

export const metadata = {
  title: 'ai-log',
  description: 'keeping up with ai research',
  openGraph: {
    title: 'ai-log',
    siteName: 'pushkar patel',
    description: 'keeping up with ai research',
    alternates: {
      canonical: `${baseUrl}/ai-log`,
    },
    type: 'article',
    url: `${baseUrl}/ai-log`,
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('ai-log')}&subtitle=${encodeURIComponent('keeping up with ai research')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ai-log',
    description: 'keeping up with ai research',
    creator: '@thepushkarp',
    images: [
      `${baseUrl}/og?title=${encodeURIComponent('ai-log')}&subtitle=${encodeURIComponent('keeping up with ai research')}`,
    ],
  },
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <article className="prose">
        <AiLogMdx />
      </article>
    </section>
  );
}
