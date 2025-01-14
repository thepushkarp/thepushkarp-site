import { notFound } from 'next/navigation';

import { getBlogPosts } from '@/app/blog/utils';
import { baseUrl } from '@/app/sitemap';
import { formatDate } from '@/lib/utils';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const posts = await getBlogPosts();
  const post = posts.find(post => post.slug === params.slug);
  if (!post) return;

  const {
    metadata: { title, subtitle, cleanTitle: originalCleanTitle, cleanSubtitle: originalCleanSubtitle },
  } = post;

  const cleanTitle = originalCleanTitle || title;
  const cleanSubtitle = originalCleanSubtitle || subtitle;

  return {
    title,
    description: subtitle,
    openGraph: {
      title,
      siteName: 'pushkar patel',
      description: subtitle,
      type: 'article',
      url: `${baseUrl}/blog/${post.slug}`,
      alternate: {
        canonical: `${baseUrl}/blog/${post.slug}`,
      },
      images: [
        {
          url: `${baseUrl}/og?title=${encodeURIComponent(cleanTitle)}&subtitle=${encodeURIComponent(cleanSubtitle)}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: subtitle,
      creator: '@thepushkarp',
      images: [`${baseUrl}/og?title=${encodeURIComponent(cleanTitle)}&subtitle=${encodeURIComponent(cleanSubtitle)}`],
    },
  };
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const posts = await getBlogPosts();
  const post = posts.find(post => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const { default: Component } = await import(`@/app/blog/posts/${post.filename}`);

  return (
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
        {/* {post.metadata.tags && (
          <div className="mb-2">
            Tags:{' '}
            {post.metadata.tags.map(tag => (
              <span key={tag} className="mr-2">
                {tag}
              </span>
            ))}
          </div>
        )} */}
      </div>
      <article className="prose">
        <Component />
      </article>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}
