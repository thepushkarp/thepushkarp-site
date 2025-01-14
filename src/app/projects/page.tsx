import { baseUrl } from '@/app/sitemap';

import ProjectsMdx from './projects.mdx';

export const metadata = {
  title: 'selected projects',
  description: 'stuff i work on and tinker with',
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
  openGraph: {
    title: 'selected projects',
    siteName: 'pushkar patel',
    description: 'stuff i work on and tinker with',
    type: 'article',
    url: `${baseUrl}/projects`,
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('selected projects')}&subtitle=${encodeURIComponent('stuff i work on and tinker with')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'selected projects',
    description: 'stuff i work on and tinker with',
    creator: '@thepushkarp',
    images: [
      `${baseUrl}/og?title=${encodeURIComponent('selected projects')}&subtitle=${encodeURIComponent('stuff i work on and tinker with')}`,
    ],
  },
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <article className="prose">
        <ProjectsMdx />
      </article>
    </section>
  );
}
