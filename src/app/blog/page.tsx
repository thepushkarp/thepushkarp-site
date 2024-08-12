import { BlogPosts } from '@/components/posts';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export const metadata = {
  title: 'blog',
  description: 'read my blog',
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">my blog</h1>
      <BlogPosts />
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
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
