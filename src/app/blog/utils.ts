import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    slug: string;
    publishedAt: string;
    subtitle: string;
    lastModifiedAt?: string;
    tags?: string[];
  };
  filename: string;
  content: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDir = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

  const posts = filenames.map(filename => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const { data, content } = matter(fileContent);

    return {
      slug: data.slug,
      metadata: {
        title: data.title,
        slug: data.slug,
        publishedAt: data.publishedAt,
        subtitle: data.subtitle,
        lastModifiedAt: data.lastModifiedAt,
        tags: data.tags,
      },
      filename: filename,
      content: content,
    };
  });

  return posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });
}
