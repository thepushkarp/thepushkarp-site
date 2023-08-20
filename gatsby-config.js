/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Pushkar Patel`,
    author: {
      name: `Pushkar Patel`,
    },
    description: `Pushkar's Website`,
    siteUrl: `https://thepushkarp.com/`,
    social: {
      twitter: `thepushkarp`,
      github: `thepushkarp`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-Q4S79DE3D1', // Google Analytics / GA
        ],
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ['/preview/**', '/do-not-track/me/too/'],
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      siteUrl: 'https://thepushkarp.com/',
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://thepushkarp.com/',
        sitemap: 'https://thepushkarp.com/sitemap-index.xml',
        policy: [
          { userAgent: '*', allow: '/' },
          // Additional rules
        ],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://thepushkarp.com/`,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        mergeScriptHashes: false, // you can disable scripts sha256 hashes
        mergeStyleHashes: false, // you can disable styles sha256 hashes
        mergeDefaultDirectives: true,
        directives: {
          'script-src':
            "'self' www.google-analytics.com www.googletagmanager.com thenibble.substack.com 'unsafe-inline'",
          'default-src': "'self'",
          'object-src': "'none'",
          'style-src-elem': "'self' fonts.googleapis.com 'unsafe-inline'",
          'style-src': "'self' fonts.googleapis.com 'unsafe-inline'",
          'img-src':
            "'self' data: www.google-analytics.com www.googletagmanager.com",
          'connect-src':
            "'self' www.google-analytics.com www.googletagmanager.com",
          'frame-src': "'self' thenibble.substack.com",
          // you can add your directives or override defaults
        },
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          'https://twitter.com',
          'https://github.com',
          'https://blog.thepushkarp.com/',
          'https://thenibble.substack.com/',
        ],
      },
    },
  ],
}
