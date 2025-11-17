import { Helmet } from 'react-helmet-async';

import ProjectsMdx from '@/app/projects/projects.mdx';
import { generateSEOMeta } from '@/lib/seo';
import { useMDXComponents } from '@/mdx-components';

export default function ProjectsPage() {
  const title = 'selected projects';
  const description = 'stuff i work on and tinker with';
  const mdxComponents = useMDXComponents({});

  return (
    <>
      <Helmet
        {...generateSEOMeta({
          title,
          description,
          path: '/projects',
          ogImage: '/images/og-projects.png',
          ogType: 'article',
        })}
      />

      <section>
        <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>
        <article className="prose">
          <ProjectsMdx components={mdxComponents} />
        </article>
      </section>
    </>
  );
}
