import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { baseUrl } from '@/app/sitemap';
import { useMDXComponents } from '@/mdx-components';

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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getLearningPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.subtitle,
    openGraph: {
      title: post.frontmatter.title,
      siteName: 'pushkar patel',
      description: post.frontmatter.subtitle,
      type: 'article',
      url: `${baseUrl}/learning/${post.slug}`,
      alternate: {
        canonical: `${baseUrl}/learning/${post.slug}`,
      },
      images: [
        {
          url: `${baseUrl}/og?title=${encodeURIComponent(post.frontmatter.title)}&subtitle=${encodeURIComponent(post.frontmatter.subtitle)}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.subtitle,
      creator: '@thepushkarp',
    },
  };
}

export default async function LearningSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getLearningPost(slug);

  if (!post) {
    notFound(); // Trigger 404 if post doesn't exist
  }

  const { frontmatter, content } = post;
  const components = useMDXComponents({});

  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{frontmatter.title}</h1>
      <p className="text-muted-foreground mb-2">{frontmatter.subtitle}</p>
      <article className="prose">
        <MDXRemote source={content} components={components} />
      </article>
    </section>
  );
}
