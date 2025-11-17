import { Helmet } from 'react-helmet-async';

import MiscMdx from '@/app/misc/misc.mdx';
import { generateSEOMeta } from '@/lib/seo';
import { useMDXComponents } from '@/mdx-components';

export default function MiscPage() {
  const title = 'miscellaneous';
  const description = 'a potpourri of things i find interesting';
  const mdxComponents = useMDXComponents({});

  return (
    <>
      <Helmet
        {...generateSEOMeta({
          title,
          description,
          path: '/misc',
          ogImage: '/images/og-misc.png',
          ogType: 'article',
        })}
      />

      <section>
        <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>
        <article className="prose">
          <MiscMdx components={mdxComponents} />
        </article>
      </section>
    </>
  );
}
