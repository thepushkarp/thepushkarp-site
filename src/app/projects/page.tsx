import { CustomMDX } from '@/components/mdx';
import { readMDXFile } from '@/app/blog/utils';
import path from 'path';
import { baseUrl } from '@/app/sitemap';

export const metadata = {
  title: 'projects',
  description: 'stuff i do',
  openGraph: {
    title: 'projects',
    description: 'stuff i do',
    type: 'article',
    url: `${baseUrl}/projects`,
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('projects')}&subtitle=${encodeURIComponent('stuff i do')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'projects',
    description: 'stuff i do',
    creator: '@thepushkarp',
    images: [`${baseUrl}/og?title=${encodeURIComponent('projects')}&subtitle=${encodeURIComponent('stuff i do')}`],
  },
};

export default function Page() {
  const { content } = readMDXFile(path.join(process.cwd(), 'src', 'app', 'projects', 'projects.mdx'));

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
