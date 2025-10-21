import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import blogPosts from '@/data/blog-posts.json';
import { formatDateYYYYMMDD } from '@/lib/utils';

const baseUrl = 'https://thepushkarp.com';

export default function BlogListPage() {
  // Group posts by year
  const postsByYear = blogPosts.reduce(
    (acc, post) => {
      const year = new Date(post.metadata.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof blogPosts>,
  );

  // Sort years in descending order
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <Helmet>
        <title>blog | pushkar patel</title>
        <meta name="description" content="some thoughts, some ideas, some rants, some code" />
        <link rel="canonical" href={`${baseUrl}/blog`} />

        {/* Open Graph */}
        <meta property="og:title" content="blog" />
        <meta property="og:description" content="some thoughts, some ideas, some rants, some code" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/blog`} />
        <meta property="og:site_name" content="pushkar patel" />
        <meta property="og:image" content={`${baseUrl}/images/og-blog.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="blog" />
        <meta name="twitter:description" content="some thoughts, some ideas, some rants, some code" />
        <meta name="twitter:creator" content="@thepushkarp" />
        <meta name="twitter:image" content={`${baseUrl}/images/og-blog.png`} />
      </Helmet>

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
                      to={`/blog/${post.slug}`}
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
    </>
  );
}
