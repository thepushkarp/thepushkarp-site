import type { HelmetProps } from 'react-helmet-async';

const baseUrl = 'https://thepushkarp.com';
const siteName = 'pushkar patel';
const twitterHandle = '@thepushkarp';

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

/**
 * Generates SEO metadata props for react-helmet-async.
 * Centralizes all SEO boilerplate to avoid repetition across pages.
 */
export function generateSEOMeta({
  title,
  description,
  path,
  ogImage,
  ogType = 'website',
  noindex = false,
}: SEOProps): HelmetProps {
  const fullTitle = `${title} | ${siteName}`;
  const url = `${baseUrl}${path}`;
  // Handle both absolute URLs and relative paths
  const image = ogImage?.startsWith('http') ? ogImage : `${baseUrl}${ogImage || '/images/og-default.png'}`;

  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: siteName },
      { property: 'og:image', content: image },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:creator', content: twitterHandle },
      ...(ogType === 'website' ? [{ name: 'twitter:site', content: twitterHandle }] : []),
      { name: 'twitter:image', content: image },
    ],
    link: [{ rel: 'canonical', href: url }],
  };
}
