import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { formatDate, getBlogPosts } from '@/app/blog/utils';
import { baseUrl } from '@/app/sitemap';

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find(post => post.slug === params.slug);
  if (!post) {
    return;
  }

  let { title, publishedAt: publishedTime, summary: description, keywords, image } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      siteName: 'pushkar patel',
      locale: 'en_GB',
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@thepushkarp',
      images: [ogImage],
      site: '@thepushkarp',
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find(post => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}&subtitle=${encodeURIComponent(
                  post.metadata.summary
                )}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'pushkar patel',
            },
          }),
        }}
      />
      <h1 className="title font-semibold tracking-tighter">{post.metadata.title}</h1>
      {post.metadata.summary && <p className="text-m">{post.metadata.summary}</p>}
      <div className="flex flex-col justify-between items-start mt-2 mb-8 text-xs">
        <p className="text-sm text-muted-foreground">Published on: {formatDate(post.metadata.publishedAt, true)}</p>
        <p className="text-sm text-muted-foreground">Last Edited on: {formatDate(post.metadata.lastEdited, true)}</p>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
