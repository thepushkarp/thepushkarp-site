import { notFound } from 'next/navigation';

import { baseUrl } from '@/app/sitemap';

import { getAllLearningPostsMetadata, getLearningPost } from '../utils';

// Generate static paths for all learning posts
export async function generateStaticParams() {
  const posts = await getAllLearningPostsMetadata();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// Optional: Set dynamicParams to false if you want 404 for non-pre-rendered slugs
// export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Destructure slug from params
  const post = await getLearningPost(slug); // Use the destructured slug

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Ensure subtitle exists before using it
  const subtitle = post.frontmatter.subtitle || 'Default description'; // Provide a fallback

  return {
    title: post.frontmatter.title,
    description: subtitle,
    openGraph: {
      title: post.frontmatter.title,
      siteName: 'pushkar patel',
      description: subtitle,
      type: 'article',
      url: `${baseUrl}/learning/${slug}`, // Use the destructured slug
      images: [
        {
          // Ensure subtitle is defined before encoding, provide fallback
          url: `${baseUrl}/og?title=${encodeURIComponent(post.frontmatter.title)}&subtitle=${encodeURIComponent(subtitle)}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      // Ensure subtitle is defined before using, provide fallback
      description: subtitle,
      creator: '@thepushkarp',
      images: [
        `${baseUrl}/og?title=${encodeURIComponent(post.frontmatter.title)}&subtitle=${encodeURIComponent(subtitle)}`,
      ],
    },
  };
}

export default async function LearningSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Destructure slug from params
  const post = await getLearningPost(slug); // Use the destructured slug

  if (!post) {
    notFound(); // Trigger 404 if post doesn't exist
  }

  const { frontmatter, filename } = post; // Get filename

  // Dynamically import the component
  const { default: Component } = await import(`../posts/${filename}`);

  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{frontmatter.title}</h1>
      <p className="text-muted-foreground mb-2">{frontmatter.subtitle}</p>
      <article className="prose dark:prose-invert max-w-none">
        <Component />
      </article>
    </section>
  );
}
