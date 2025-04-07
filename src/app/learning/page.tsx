import { baseUrl } from '@/app/sitemap';

import LearningMdx from './learning.mdx';

export const metadata = {
  title: 'learning',
  description: 'logging my ai and tech learning',
  openGraph: {
    title: 'learning',
    siteName: 'pushkar patel',
    description: 'logging my ai and tech learning',
    alternates: {
      canonical: `${baseUrl}/misc/learning`,
    },
    type: 'article',
    url: `${baseUrl}/misc/learning`,
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('learning')}&subtitle=${encodeURIComponent('logging my ai and tech learning')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'learning',
    description: 'logging my ai and tech learning',
    creator: '@thepushkarp',
    images: [
      `${baseUrl}/og?title=${encodeURIComponent('learning')}&subtitle=${encodeURIComponent('logging my ai and tech learning')}`,
    ],
  },
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <article className="prose">
        <LearningMdx />
      </article>
    </section>
  );
}
