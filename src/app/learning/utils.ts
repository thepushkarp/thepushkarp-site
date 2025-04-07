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
  filename: string;
  frontmatter: LearningFrontmatter;
  content: string;
}

// Helper function to get slug from file path
const getSlugFromPath = (filePath: string): string => {
  return path.basename(filePath, path.extname(filePath));
};

// Function to get a single post by slug
export async function getLearningPost(slug: string): Promise<LearningPost | null> {
  const files = await glob(`${POSTS_PATH}/${slug}.mdx`);
  if (files.length === 0) {
    console.warn(`No file found for slug "${slug}" in ${POSTS_PATH}`);
    return null;
  }
  if (files.length > 1) {
    console.warn(`Multiple files found for slug "${slug}". Using the first one: ${files[0]}`);
  }

  const filePath = files[0];
  const filename = path.basename(filePath);

  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(source);

    // Basic validation for title
    if (!data.title || typeof data.title !== 'string') {
      console.warn(`Post "${slug}" is missing a valid title in frontmatter.`);
    }

    // Basic validation for subtitle
    if (!data.subtitle || typeof data.subtitle !== 'string') {
      console.warn(`Post "${slug}" is missing a valid subtitle in frontmatter.`);
      data.subtitle = data.subtitle || 'Default subtitle';
    }

    return {
      slug,
      filename,
      frontmatter: data as LearningFrontmatter,
      content,
    };
  } catch (error) {
    // Handle file not found or other errors
    console.error(`Error reading learning post "${slug}" from file ${filePath}:`, error);
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
