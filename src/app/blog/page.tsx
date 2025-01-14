import Link from 'next/link';

import { getBlogPosts } from '@/app/blog/utils';
import { baseUrl } from '@/app/sitemap';
import { formatDateYYYYMMDD } from '@/lib/utils';

export const metadata = {
  title: 'blog',
  description: 'some thoughts, some ideas, some rants, some code',
  openGraph: {
    title: 'blog',
    siteName: 'pushkar patel',
    description: 'some thoughts, some ideas, some rants, some code',
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
    type: 'article',
    url: `${baseUrl}/blog`,
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('blog')}&subtitle=${encodeURIComponent('some thoughts, some ideas, some rants, some code')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'blog',
    description: 'some thoughts, some ideas, some rants, some code',
    creator: '@thepushkarp',
    images: [
      `${baseUrl}/og?title=${encodeURIComponent('blog')}&subtitle=${encodeURIComponent('some thoughts, some ideas, some rants, some code')}`,
    ],
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Group posts by year
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.metadata.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof posts>
  );

  // Sort years in descending order
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">blog</h1>
      <p className="text-muted-foreground mb-8">some thoughts, some ideas, some rants, some code</p>
      <article className="prose">
        {years.map(year => (
          <div key={year} className="mb-8">
            <h2 className="text-sm font-bold mb-4">{year}</h2>
            <ul className="font-departure-mono blog-list">
              {postsByYear[year].map(post => (
                <li key={post.slug} className="blog-list-item px-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-row py-1 px-2 gap-2 relative group transition-colors blog-link"
                  >
                    <time dateTime={post.metadata.publishedAt} className="text-muted-foreground min-w-[120px]">
                      {formatDateYYYYMMDD(post.metadata.publishedAt)}
                    </time>
                    <span className="group-hover:text-primary transition-colors">{post.metadata.title}</span>
                    <span className="absolute inset-0 outline-dashed outline-[0.2em] outline-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-md hidden lg:block" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </article>
    </section>
  );
}
