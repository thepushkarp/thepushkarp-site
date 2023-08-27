/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ description, title, children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          social {
            twitter
          }
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{`${defaultTitle}`}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content="Pushkar Patel" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="GPTBot" content="index, follow" />
      <meta name="google" content="notranslate" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="language" content="English" />
      <meta name="coverage" content="Worldwide" />
      <meta name="rating" content="General" />
      <meta name="apple-mobile-web-app-title" content="Pushkar Patel" />
      <meta name="application-name" content="Pushkar Patel" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="../../images/profile-pic.png"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#ffffff"
      />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content="https://thepushkarp.com" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content="../../images/profile-pic.png" />
      <meta property="og:image:alt" content="Pushkar Patel" />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <meta property="og:site_name" content="Pushkar Patel" />

      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ''}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content="../../images/profile-pic.png" />
      <meta name="twitter:image:alt" content="Pushkar Patel" />
      <meta name="twitter:image:width" content="256" />
      <meta name="twitter:image:height" content="256" />
      <meta
        name="twitter:site"
        content={site.siteMetadata?.social?.twitter || ''}
      />
      <link rel="prefetch" href="../../style.css" as="style" />
      <link rel="preload" href="../../style.css" as="style" />
      {children}
    </>
  );
};

export default Seo;
