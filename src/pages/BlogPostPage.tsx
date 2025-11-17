import type { MDXComponents } from 'mdx/types';
import { Suspense, useMemo, lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';

import blogPosts from '@/data/blog-posts.json';
import { generateSEOMeta } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { useMDXComponents } from '@/mdx-components';
type MdxContentComponent = ComponentType<{ components?: MDXComponents }>;
type MdxModule = { default: MdxContentComponent };

// Import all MDX files at once using Vite's glob import
const mdxModules = import.meta.glob<MdxModule>('/src/app/blog/posts/*.mdx');

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const mdxComponents = useMDXComponents({});

  const MdxComponent = useMemo<LazyExoticComponent<MdxContentComponent> | null>(() => {
    if (!post) return null;
    const path = `/src/app/blog/posts/${post.filename}`;
    const importFn = mdxModules[path];
    if (!importFn) return null;
    return lazy(() => importFn().then(mod => ({ default: mod.default })));
  }, [post]);

  if (!post || !MdxComponent) {
    return <NotFoundPage />;
  }

  const {
    metadata: { title, subtitle },
  } = post;

  return (
    <>
      <Helmet
        {...generateSEOMeta({
          title,
          description: subtitle,
          path: `/blog/${post.slug}`,
          ogImage: '/images/og-blog.png',
          ogType: 'article',
        })}
      />

      <section>
        <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{post.metadata.title}</h1>
        <p className="text-muted-foreground mb-2">{post.metadata.subtitle}</p>
        <div className="text-sm text-muted-foreground mb-8">
          <div className="mb-2">
            Published: <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt, true)}</time>
          </div>
          {post.metadata.lastModifiedAt && post.metadata.lastModifiedAt !== post.metadata.publishedAt && (
            <div className="mb-2">
              Last modified:{' '}
              <time dateTime={post.metadata.lastModifiedAt}>{formatDate(post.metadata.lastModifiedAt, true)}</time>
            </div>
          )}
        </div>
        <article className="prose">
          <Suspense fallback={<div>Loading...</div>}>
            <MdxComponent components={mdxComponents} />
          </Suspense>
        </article>
      </section>
    </>
  );
}
