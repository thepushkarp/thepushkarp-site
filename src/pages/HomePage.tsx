import { Helmet } from 'react-helmet-async';

import IndexMdx from '@/app/index.mdx';
import { TimeDisplay } from '@/components/TimeDisplay';
import { generateSEOMeta } from '@/lib/seo';
import { useMDXComponents } from '@/mdx-components';

export default function HomePage() {
  const imgDimensions = {
    width: 128,
    height: 128,
  };
  const mdxComponents = useMDXComponents({});

  return (
    <>
      <Helmet {...generateSEOMeta({ title: 'pushkar patel', description: "pushkar's site", path: '/' })} />

      <main className="flex flex-col text-left">
        <h1 className="mb-8 font-semibold tracking-tighter">pushkar patel</h1>
        <TimeDisplay />
        <div className="flex flex-row">
          <section className="w-full">
            <article className="prose relative">
              <div className="float-right ml-4 mb-4 w-[35%] max-w-[256px] min-w-[64px]">
                <picture>
                  <source srcSet="/images/avatar.webp" type="image/webp" />
                  <source srcSet="/images/avatar.png" type="image/png" />
                  <img
                    src="/images/avatar.png"
                    alt="Pushkar"
                    width={imgDimensions.width}
                    height={imgDimensions.height}
                    className="w-full h-auto rounded-2xl"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
              <IndexMdx components={mdxComponents} />
            </article>
          </section>
        </div>
      </main>
    </>
  );
}
