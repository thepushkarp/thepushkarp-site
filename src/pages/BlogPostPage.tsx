import { Suspense, useMemo, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import blogPosts from '@/data/blog-posts.json';
import { formatDate } from '@/lib/utils';

import NotFoundPage from './NotFoundPage';

const baseUrl = 'https://thepushkarp.com';

// Import all MDX files at once using Vite's glob import
const mdxModules = import.meta.glob('@/app/blog/posts/*.mdx');

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  // Dynamically import the MDX component
  const MdxComponent = useMemo(() => {
    if (!post) return null;
    const path = `/src/app/blog/posts/${post.filename}`;
    const importFn = mdxModules[path];
    if (!importFn) return null;
    return lazy(() => importFn().then((mod: any) => ({ default: mod.default })));
  }, [post]);

  if (!post || !MdxComponent) {
    return <NotFoundPage />;
  }

  const {
    metadata: { title, subtitle, cleanTitle: originalCleanTitle, cleanSubtitle: originalCleanSubtitle },
  } = post;

  const cleanTitle = originalCleanTitle || title;
  const cleanSubtitle = originalCleanSubtitle || subtitle;

  return (
    <>
      <Helmet>
        <title>{title} | pushkar patel</title>
        <meta name="description" content={subtitle} />
        <link rel="canonical" href={`${baseUrl}/blog/${post.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={subtitle} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/blog/${post.slug}`} />
        <meta property="og:site_name" content="pushkar patel" />
        <meta property="og:image" content={`${baseUrl}/images/og-blog.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={subtitle} />
        <meta name="twitter:creator" content="@thepushkarp" />
        <meta name="twitter:image" content={`${baseUrl}/images/og-blog.png`} />
      </Helmet>

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
            <MdxComponent />
          </Suspense>
        </article>
      </section>
    </>
  );
}
