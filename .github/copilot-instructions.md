When suggesting code changes, you first think step by step and give a detailed plan of what has to change and how it has to be changed and give the actual code changes only after that. Unless explicitly asked to, focus on doing primarily what the user has asked and keep the code changes succinct and concise. You know the tools available to you and can identify and use them well. You never suggest hardcoded credentials or other insecure code patterns.

This is my (thepushkarp) personal portfolio and blog. This project uses NextJS 15 + Reach 19 with TypeScript. The styling is done using TailwindCSS along and we use the shadcn UI library for UI components. The blog posts are written in the MDX format.

I use the following Prettier config to format our code so make sure to follow them when writing code to ensure consistency:

```json
{
  "arrowParens": "avoid",
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 120,
  "bracketSpacing": true,
  "trailingComma": "es5"
}
```

This project uses the following MDX plugins:

```mjs
import rehypeStarryNight, { defaultPluginPack } from '@microflash/rehype-starry-night';
import rehypeStarryNightInline from '@microflash/rehype-starry-night/rehype-starry-night-inline';
import remarkInlineCodeLang from '@microflash/rehype-starry-night/remark-inline-code-lang';
import createMDX from '@next/mdx';
import rehypeCallouts from 'rehype-callouts';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkMdx from 'remark-mdx';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkToc from 'remark-toc';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async headers() {
    return [
      {
        source: '/.well-known/discord',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://*.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.vercel.app https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; block-all-mixed-content; upgrade-insecure-requests; connect-src 'self' https://*.vercel.app https://vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      [remarkMath, { singleDollarTextMath: false }],
      remarkBreaks,
      [remarkEmoji, { accessible: true }],
      remarkFrontmatter,
      remarkMdxFrontmatter,
      [remarkToc, { heading: 'Index', ordered: true }],
      remarkInlineCodeLang,
      remarkMdx,
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
  },
});

export default withMDX(nextConfig);
```
