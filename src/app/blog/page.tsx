import { BlogPosts } from '@/components/posts';
import { baseUrl } from '@/app/sitemap';

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

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">blog</h1>
      <p className="text-muted-foreground mb-8">some thoughts, some ideas, some rants, some code</p>
      <BlogPosts />
    </section>
  );
}
