import { Helmet } from 'react-helmet-async';

import IndexMdx from '@/app/index.mdx';
import { TimeDisplay } from '@/components/TimeDisplay';

const baseUrl = 'https://thepushkarp.com';

export default function HomePage() {
  const imgDimensions = {
    width: 128,
    height: 128,
  };

  return (
    <>
      <Helmet>
        <title>pushkar patel</title>
        <meta name="description" content="pushkar's site" />
        <link rel="canonical" href={baseUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="pushkar patel" />
        <meta property="og:description" content="pushkar's site" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:site_name" content="pushkar patel" />
        <meta property="og:image" content={`${baseUrl}/images/og-default.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="pushkar patel" />
        <meta name="twitter:description" content="pushkar's site" />
        <meta name="twitter:creator" content="@thepushkarp" />
        <meta name="twitter:site" content="@thepushkarp" />
        <meta name="twitter:image" content={`${baseUrl}/images/og-default.png`} />
      </Helmet>

      <main className="flex flex-col text-left">
        <h1 className="mb-8 font-semibold tracking-tighter">pushkar patel</h1>
        <TimeDisplay />
        <div className="flex flex-row">
          <section className="w-full">
            <article className="prose relative">
              <div className="float-right ml-4 mb-4 w-[35%] max-w-[256px] min-w-[64px]">
                <img
                  src="/images/favicon.svg"
                  alt="Pushkar"
                  width={imgDimensions.width}
                  height={imgDimensions.height}
                  className="w-full h-auto"
                />
              </div>
              <IndexMdx />
            </article>
          </section>
        </div>
      </main>
    </>
  );
}
