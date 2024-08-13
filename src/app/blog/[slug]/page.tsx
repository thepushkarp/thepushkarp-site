import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { formatDate, getBlogPosts } from '@/app/blog/utils';
import { baseUrl } from '@/app/sitemap';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

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

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
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
      images: [ogImage],
    },
  };
}

export default function Blog({ params }) {
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
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'pushkar patel',
            },
          }),
        }}
      />
      <h1 className="title font-semibold tracking-tighter">{post.metadata.title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-muted-foreground">{formatDate(post.metadata.publishedAt, true)}</p>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="flex items-center transition-all text-muted-foreground hover:text-primary"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <ArrowTopRightIcon />
            <p className="ml-2 h-7">rss</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
