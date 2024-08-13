import { BlogPosts } from '@/components/posts';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export const metadata = {
  title: 'blog',
  description: 'read my blog',
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-2 tracking-tighter">blog</h1>
      <p className="text-muted-foreground mb-8">some thoughts, some ideas, some rants, some code</p>
      <BlogPosts />
    </section>
  );
}
