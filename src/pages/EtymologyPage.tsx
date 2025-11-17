import { Helmet } from 'react-helmet-async';

import EtymologyMdx from '@/app/etymology/etymology.mdx';
import { generateSEOMeta } from '@/lib/seo';
import { useMDXComponents } from '@/mdx-components';

export default function EtymologyPage() {
  const title = 'etymology';
  const description = 'word origins i found interesting';
  const mdxComponents = useMDXComponents({});

  return (
    <>
      <Helmet
        {...generateSEOMeta({
          title,
          description,
          path: '/etymology',
          ogImage: '/images/og-etymology.png',
          ogType: 'article',
        })}
      />

      <section>
        <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>
        <article className="prose">
          <EtymologyMdx components={mdxComponents} />
        </article>
      </section>
    </>
  );
}
