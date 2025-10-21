import mdx from '@mdx-js/rollup';
import rehypeStarryNight, { defaultPluginPack } from '@microflash/rehype-starry-night';
import rehypeStarryNightInline from '@microflash/rehype-starry-night/rehype-starry-night-inline';
import remarkInlineCodeLang from '@microflash/rehype-starry-night/remark-inline-code-lang';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';
import { defineConfig } from 'vite';
import rehypeCallouts from 'rehype-callouts';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkToc from 'remark-toc';

// Plugin to generate blog data before build
function generateBlogDataPlugin() {
  return {
    name: 'generate-blog-data',
    buildStart() {
      console.log('Generating blog data...');
      execSync('tsx scripts/generate-blog-data.ts', { stdio: 'inherit' });
    },
  };
}

export default defineConfig({
  plugins: [
    generateBlogDataPlugin(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkGfm,
          [remarkMath, { singleDollarTextMath: false }],
          remarkBreaks,
          [remarkEmoji, { accessible: true }],
          remarkFrontmatter,
          remarkMdxFrontmatter,
          [remarkToc, { heading: 'Index', ordered: true }],
          remarkInlineCodeLang,
        ],
        rehypePlugins: [
          [
            rehypeKatex,
            {
              throwOnError: false,
              strict: false,
            },
          ],
          rehypeSlug,
          rehypeCallouts,
          [rehypeStarryNight, { plugins: defaultPluginPack }],
          rehypeStarryNightInline,
        ],
      }),
    },
    react(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
});
