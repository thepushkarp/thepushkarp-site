import Link from 'next/link';
import { baseUrl } from '@/app/sitemap';

export const metadata = {
  title: 'miscellaneous',
  description: 'a potpourri of things i find interesting',
  openGraph: {
    title: 'miscellaneous',
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

const pages = [
  {
    title: 'etymology',
    href: '/etymology',
    id: 'etymology',
    desc: 'word origins i found interesting',
  },
  {
    title: 'poems',
    href: '/poems',
    id: 'poems',
    desc: 'poems that i liked reading',
  },
];

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <ul className="list-disc list-inside space-y-2">
        {pages.map(page => (
          <li key={page.id}>
            <Link href={page.href} className="underline underline-offset-2 decoration-[0.1em] transition-all">
              {page.title}
            </Link>{' '}
            — <em>{page.desc}</em>
          </li>
        ))}
      </ul>
    </section>
  );
}
