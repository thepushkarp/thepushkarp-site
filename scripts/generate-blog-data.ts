import fs from 'fs';
import path from 'path';

import { loadBlogPosts } from './utils/content';

function generateBlogData() {
  const outputPath = path.join(process.cwd(), 'src', 'data', 'blog-posts.json');

  const dataDir = path.dirname(outputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const posts = loadBlogPosts();

  // Remove content field for JSON output (only metadata needed)
  const postsWithoutContent = posts.map(({ content, ...post }) => post);

  fs.writeFileSync(outputPath, JSON.stringify(postsWithoutContent, null, 2));
  console.log(`✅ Generated blog data for ${posts.length} posts at ${outputPath}`);
}

// Export for use in Vite plugin
export default generateBlogData;

// Run if called directly via tsx (check if this file is being executed directly)
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generate-blog-data.ts')) {
  generateBlogData();
}
