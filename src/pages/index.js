import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const revealEmail = () => {
    const email = 'thepushkarp[AT]gmail[DOT]com'
    const emailElement = document.querySelector('#hidden-address')
    emailElement.innerHTML = email
    emailElement.classList.remove('click-to-reveal-email')
    emailElement.classList.add('revealed-email')
  }

  return (
    <Layout location={location} title={siteTitle}>
      <p>Hello, I am Pushkar.</p>
      <p>
        For most of my time,
        <br />
        I write software.
        <br />
        <br />
        I also write other stuff,
        <br />
        that I should share.
        <br />
        <br />
        So I'm putting this site
        <br />
        out there somewhere.
        <br />
        <br />
        To give myself a
        <br />
        teeny-tiny little dare.
        <br />
        <br />
        To write a little more,
        <br />
        raw and bare.
        <br />
        <br />
        Maybe I'll do that a
        <br />
        justice square and fair.
        <br />
        <br />
        Or maybe not;
        <br />
        I honestly don't care.
        <br />
        <br />
        All I want is to write
        <br />
        with a little flair.
        <br />
        <br />
        And grow a little
        <br />
        more self-aware.
        <br />
        <br />
        This rhyme makes no sense
        <br />
        and it is so unfair.
        <br />
        <br />
        To you dear reader for
        <br />
        having to bear.
        <br />
        <br />
        This nonsense that for a
        <br />
        minute now you've stared.
        <br />
        <br />
        I wish you had
        <br />
        better things to care.
      </p>
      <p>
        Now while you're at it,
        <br />
        do check me out here:
        <br />
        <br />
        Personal Blog:{' '}
        <a href="https://blog.thepushkarp.com/">Pushkar's Blog</a>
        <br />
        Tech Newsletters:{' '}
        <a
          href="https://thenibble.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nibble
        </a>
        <br />
        Twitter:{' '}
        <a
          href="https://twitter.com/thepushkarp"
          target="_blank"
          rel="noopener noreferrer"
        >
          @thepushkarp
        </a>
        <br />
        GitHub:{' '}
        <a
          href="https://github.com/thepushkarp"
          target="_blank"
          rel="noopener noreferrer"
        >
          @thepushkarp
        </a>
        <br />
        Mail:{' '}
        <span
          className="click-to-reveal-email"
          id="hidden-address"
          onClick={revealEmail}
          onKeyDown={revealEmail}
          role="button"
          tabIndex={0}
        >
          {' '}
          Click to reveal{' '}
        </span>
        <br />
      </p>
      <div className="iframe-container">
        <iframe
          src="https://thenibble.substack.com/embed"
          width="100%"
          height="320"
          styles="border:1px solid #EEE; background:white;"
          frameBorder="0"
          scrolling="no"
          title="Nibble"
        ></iframe>
      </div>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY MMMM Do")
          title
          description
        }
      }
    }
  }
`
