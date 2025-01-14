import { baseUrl } from '@/app/sitemap';
import MiscMdx from './misc.mdx';

export const metadata = {
  title: 'miscellaneous',
  description: 'a potpourri of things i find interesting',
  openGraph: {
    title: 'miscellaneous',
    siteName: 'pushkar patel',
    description: 'a potpourri of things i find interesting',
    alternates: {
      canonical: `${baseUrl}/misc`,
    },
    type: 'article',
    url: `${baseUrl}/misc`,
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('miscellaneous')}&subtitle=${encodeURIComponent('a potpourri of things i find interesting')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'miscellaneous',
    description: 'a potpourri of things i find interesting',
    creator: '@thepushkarp',
    images: [
      `${baseUrl}/og?title=${encodeURIComponent('miscellaneous')}&subtitle=${encodeURIComponent('a potpourri of things i find interesting')}`,
    ],
  },
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <article className="prose">
        <MiscMdx />
      </article>
    </section>
  );
}
