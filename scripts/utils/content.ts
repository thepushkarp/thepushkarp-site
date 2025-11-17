import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

export interface BlogPostMetadata {
  title: string;
  slug: string;
  publishedAt: string;
  subtitle: string;
  cleanTitle?: string;
  cleanSubtitle?: string;
  lastModifiedAt?: string;
  tags?: string[];
}

export interface BlogPost {
  slug: string;
  metadata: BlogPostMetadata;
  filename: string;
  content: string;
}

/**
 * Reads and parses all MDX blog posts from the posts directory.
 * This is the single source of truth for blog post data.
 */
export function loadBlogPosts(): BlogPost[] {
  const postsDir = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

  const posts: BlogPost[] = filenames.map(filename => {
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
        cleanTitle: data.cleanTitle,
        cleanSubtitle: data.cleanSubtitle,
        lastModifiedAt: data.lastModifiedAt,
        tags: data.tags,
      },
      filename,
      content,
    };
  });

  // Sort by publishedAt (newest first)
  posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return posts;
}
