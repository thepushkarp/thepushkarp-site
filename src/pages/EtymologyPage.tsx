import { Helmet } from 'react-helmet-async';

import EtymologyMdx from '@/app/etymology/etymology.mdx';
import { useMDXComponents } from '@/mdx-components';

const baseUrl = 'https://thepushkarp.com';

export default function EtymologyPage() {
  const title = 'etymology';
  const description = 'word origins i found interesting';
  const mdxComponents = useMDXComponents({});

  return (
    <>
      <Helmet>
        <title>{title} | pushkar patel</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${baseUrl}/etymology`} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/etymology`} />
        <meta property="og:site_name" content="pushkar patel" />
        <meta property="og:image" content={`${baseUrl}/images/og-etymology.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@thepushkarp" />
        <meta name="twitter:image" content={`${baseUrl}/images/og-etymology.png`} />
      </Helmet>

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
