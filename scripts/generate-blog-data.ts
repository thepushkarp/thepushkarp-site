import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    slug: string;
    publishedAt: string;
    subtitle: string;
    cleanTitle?: string;
    cleanSubtitle?: string;
    lastModifiedAt?: string;
    tags?: string[];
  };
  filename: string;
}

function generateBlogData() {
  const postsDir = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  const outputPath = path.join(process.cwd(), 'src', 'data', 'blog-posts.json');

  // Ensure data directory exists
  const dataDir = path.dirname(outputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

  const posts: BlogPost[] = filenames.map(filename => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const { data } = matter(fileContent);

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
      filename: filename,
    };
  });

  // Sort by date (newest first)
  posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
  console.log(`Generated blog data for ${posts.length} posts at ${outputPath}`);
}

generateBlogData();
