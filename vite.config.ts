import { execSync } from 'child_process';
// import { createHash } from 'node:crypto';

import mdx from '@mdx-js/rollup';
import rehypeStarryNight, { defaultPluginPack } from '@microflash/rehype-starry-night';
import rehypeStarryNightInline from '@microflash/rehype-starry-night/rehype-starry-night-inline';
import remarkInlineCodeLang from '@microflash/rehype-starry-night/remark-inline-code-lang';
import react from '@vitejs/plugin-react';
// import { load } from 'cheerio';
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
import { defineConfig } from 'vite';

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

// Temporarily disabled to debug white screen issue
// function htmlSriPlugin() {
//   let resolvedConfig: Parameters<typeof defineConfig>[0] | undefined;
//
//   const isLocalUrl = (url: string | undefined) => {
//     if (!url) return false;
//     return !/^([a-z]+:)?\/\//i.test(url) && !url.startsWith('data:');
//   };
//
//   const normalizePath = (url: string, base: string) => {
//     let value = url;
//     if (base && base !== '/' && value.startsWith(base)) {
//       value = value.slice(base.length);
//     }
//     return value.replace(/^\/+/, '');
//   };
//
//   const toBuffer = (value: string | Uint8Array) =>
//     typeof value === 'string' ? Buffer.from(value) : Buffer.from(value);
//
//   return {
//     name: 'html-sri',
//     apply: 'build',
//     enforce: 'post',
//     configResolved(config: typeof resolvedConfig) {
//       resolvedConfig = config;
//     },
//     generateBundle(_options, bundle) {
//       const base = resolvedConfig?.base ?? '/';
//       const bundleItems = Object.values(bundle);
//       const findAsset = (file: string) => bundleItems.find(item => item.fileName === file);
//
//       Object.entries(bundle).forEach(([fileName, asset]) => {
//         if (asset.type !== 'asset' || !fileName.endsWith('.html')) {
//           return;
//         }
//
//         const html = typeof asset.source === 'string' ? asset.source : asset.source?.toString();
//
//         if (!html) return;
//
//         const $ = load(html);
//         const targets = [
//           ...$('script[src]').toArray(),
//           ...$('link[rel="stylesheet"][href]').toArray(),
//           ...$('link[rel="modulepreload"][href]').toArray(),
//         ];
//
//         targets.forEach(element => {
//           const attr = element.name === 'script' ? 'src' : 'href';
//           const url = element.attribs[attr];
//           if (!isLocalUrl(url)) return;
//
//           const normalized = normalizePath(url, base);
//           const chunk = findAsset(normalized);
//           if (!chunk) return;
//
//           const payload = chunk.type === 'asset' ? chunk.source : chunk.code;
//
//           if (!payload) return;
//
//           const integrity = `sha384-${createHash('sha384').update(toBuffer(payload)).digest('base64')}`;
//
//           element.attribs.integrity = integrity;
//           if (!element.attribs.crossorigin) {
//             element.attribs.crossorigin = 'anonymous';
//           }
//         });
//
//         asset.source = $.html();
//       });
//     },
//   };
// }

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
    // Temporarily disabled SRI plugin to debug white screen issue
    // htmlSriPlugin(),
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
