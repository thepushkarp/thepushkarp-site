import { CustomMDX } from '@/components/mdx';
import { readMDXFile } from '@/app/blog/utils';
import path from 'path';
import { baseUrl } from '@/app/sitemap';

export const metadata = {
  title: 'etymology',
  description: 'word origins i found interesting',
  openGraph: {
    title: 'etymology',
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
  const { content } = readMDXFile(path.join(process.cwd(), 'src', 'app', 'etymology', 'etymology.mdx'));

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
