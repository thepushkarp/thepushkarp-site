/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` });
  <link rel="prefetch" href="/src/style.css" as="style" />;
  <link rel="preload" href="/src/style.css" as="style" />;
};
