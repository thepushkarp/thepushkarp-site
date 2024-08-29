import { CustomMDX } from '@/components/mdx';
import { readMDXFile } from '@/app/blog/utils';
import path from 'path';
import { baseUrl } from '@/app/sitemap';

export const metadata = {
  title: 'poems',
  description: 'poems that i liked reading',
  openGraph: {
    title: 'poems',
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
  const { content } = readMDXFile(path.join(process.cwd(), 'src', 'app', 'poems', 'poems.mdx'));

  return (
    <>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <section className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={content} />
      </section>
    </>
  );
}
