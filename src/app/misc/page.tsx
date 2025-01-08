import { CustomMDX } from '@/components/mdx';
import { readMDXFile } from '@/app/blog/utils';
import path from 'path';
import { baseUrl } from '@/app/sitemap';

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
  const { content } = readMDXFile(path.join(process.cwd(), 'src', 'app', 'misc', 'misc.mdx'));

  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={content} />
      </article>
    </section>
  );
}
