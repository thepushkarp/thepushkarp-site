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
