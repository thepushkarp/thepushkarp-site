import Link from 'next/link';
import { formatDate, getBlogPosts } from '@/app/blog/utils';

export function BlogPosts() {
  let allBlogs = getBlogPosts();
  let numPosts = allBlogs.length;

  // Group posts by year
  const postsByYear = allBlogs.reduce(
    (acc, post) => {
      const year = new Date(post.metadata.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as { [year: number]: typeof allBlogs }
  );

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div>
      {numPosts > 0 &&
        sortedYears.map(year => (
          <div key={year}>
            <h2 className="mb-2 text-sm">{year}</h2>
            {postsByYear[Number(year)]
              .sort((a, b) => (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1))
              .map(post => (
                <Link key={post.slug} className="flex flex-col space-y-1 mb-4" href={`/blog/${post.slug}`}>
                  <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                    <p className="text-muted-foreground w-[100px] tabular-nums">
                      {formatDate(post.metadata.publishedAt, false)}
                    </p>
                    <p className="tracking-tight">{post.metadata.title}</p>
                  </div>
                </Link>
              ))}
          </div>
        ))}
      {numPosts === 0 && (
        <p>all blogs are currently in my mind&apos;s latent space and i&apos;m fighting to get them out...</p>
      )}
    </div>
  );
}
