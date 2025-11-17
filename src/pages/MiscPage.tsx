import { Helmet } from 'react-helmet-async';

import MiscMdx from '@/app/misc/misc.mdx';
import { useMDXComponents } from '@/mdx-components';

const baseUrl = 'https://thepushkarp.com';

export default function MiscPage() {
  const title = 'miscellaneous';
  const description = 'a potpourri of things i find interesting';
  const mdxComponents = useMDXComponents({});

  return (
    <>
      <Helmet>
        <title>{title} | pushkar patel</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${baseUrl}/misc`} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/misc`} />
        <meta property="og:site_name" content="pushkar patel" />
        <meta property="og:image" content={`${baseUrl}/images/og-misc.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@thepushkarp" />
        <meta name="twitter:image" content={`${baseUrl}/images/og-misc.png`} />
      </Helmet>

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
