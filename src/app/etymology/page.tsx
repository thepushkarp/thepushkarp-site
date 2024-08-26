import { CustomMDX } from '@/components/mdx';
import { readMDXFile } from '@/app/blog/utils';
import path from 'path';

export const metadata = {
  title: 'etymology',
  description: 'word origins i found interesting',
};

export default function Page() {
  const { content } = readMDXFile(path.join(process.cwd(), 'src', 'app', 'etymology', 'etymology.mdx'));

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
