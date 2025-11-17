import { Helmet } from 'react-helmet-async';

import AiLogMdx from '@/app/ai-log/ai-log.mdx';
import { generateSEOMeta } from '@/lib/seo';
import { useMDXComponents } from '@/mdx-components';

export default function AiLogPage() {
  const title = 'ai-log';
  const description = 'keeping up with ai research';
  const mdxComponents = useMDXComponents({});

  return (
    <>
      <Helmet
        {...generateSEOMeta({
          title,
          description,
          path: '/ai-log',
          ogImage: '/images/og-ai-log.png',
          ogType: 'article',
        })}
      />

      <section>
        <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>
        <article className="prose">
          <AiLogMdx components={mdxComponents} />
        </article>
      </section>
    </>
  );
}
