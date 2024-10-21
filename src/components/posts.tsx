import Link from 'next/link';
import { getBlogPosts } from '@/app/blog/utils';
import { formatDateYYYYMMDD } from '@/lib/utils';

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
            <ul className="list-none pl-0">
              {postsByYear[Number(year)]
                .sort((a, b) => (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1))
                .map(post => (
                  <li key={post.slug} className="mb-1">
                    <Link
                      className="flex flex-row items-center space-x-2 py-1 px-2 rounded-md lg:hover:outline-2 lg:hover:outline-dashed lg:hover:outline-muted hover:text-primary w-full"
                      href={`/blog/${post.slug}`}
                    >
                      <span className="flex-shrink-0 select-none text-secondary-foreground">&gt;</span>
                      <p className="text-muted-foreground w-[100px] flex-shrink-0 tabular-nums">
                        {formatDateYYYYMMDD(post.metadata.publishedAt)}
                      </p>
                      <p className="tracking-tight truncate flex-grow">{post.metadata.title}</p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      {numPosts === 0 && (
        <p>all blogs are currently in my mind&apos;s latent space and i&apos;m fighting to get them out...</p>
      )}
    </div>
  );
}
