import fs from 'fs';
import path from 'path';

import { glob } from 'glob';
import matter from 'gray-matter';

const POSTS_PATH = path.join(process.cwd(), 'src/app/learning/posts');

export interface LearningFrontmatter {
  title: string;
  slug: string;
  subtitle: string;
  cleanTitle?: string;
  cleanSubtitle?: string;
  tags?: string[];
}

export interface LearningPost {
  slug: string;
  frontmatter: LearningFrontmatter;
  content: string;
}

// Helper function to get slug from file path
const getSlugFromPath = (filePath: string): string => {
  return path.basename(filePath, path.extname(filePath));
};

// Function to get a single post by slug
export async function getLearningPost(slug: string): Promise<LearningPost | null> {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(source);

    // Basic validation for title
    if (!data.title || typeof data.title !== 'string') {
      console.warn(`Post "${slug}" is missing a valid title in frontmatter.`);
      // Decide how to handle missing title - throw error, use default, etc.
      // For now, let's allow it but log a warning. You might want stricter validation.
    }

    return {
      slug,
      frontmatter: data as LearningFrontmatter,
      content,
    };
  } catch (error) {
    // Handle file not found or other errors
    console.error(`Error reading learning post "${slug}":`, error);
    return null;
  }
}

// Function to get metadata for all posts (for generateStaticParams)
export async function getAllLearningPostsMetadata(): Promise<{ slug: string; frontmatter: LearningFrontmatter }[]> {
  const files = await glob(`${POSTS_PATH}/**/*.mdx`);
  const postsMetadata = files
    .map(filePath => {
      try {
        const source = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(source);
        const slug = getSlugFromPath(filePath);

        // Basic validation for title
        if (!data.title || typeof data.title !== 'string') {
          console.warn(`Post "${slug}" (path: ${filePath}) is missing a valid title in frontmatter.`);
          // Skip posts without a title for metadata generation
          return null;
        }

        return {
          slug: getSlugFromPath(filePath),
          frontmatter: data as LearningFrontmatter,
        };
      } catch (error) {
        console.error(`Error processing metadata for file ${filePath}:`, error);
        return null; // Skip files that cause errors
      }
    })
    .filter((post): post is { slug: string; frontmatter: LearningFrontmatter } => post !== null); // Filter out nulls

  return postsMetadata;
}
