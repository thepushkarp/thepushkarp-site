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
  }

  return (
    <Layout location={location} title={siteTitle}>
      <p>Hello, I am Pushkar.</p>
      <p>
        For most of my time, I write software.
        <br />
        But I also write other stuff that I should share.
        <br />
        So I'm putting this site out there.
        <br />
        In order to give myself a teeny-tiny little dare.
        <br />
        To write a little more, raw and bare.
        <br />
        Maybe I'll do that a justice square and fair.
        <br />
        Or maybe not, I honestly don't care.
        <br />
        All I want is to write with a little flair.
        <br />
        And grow a little more self-aware.
        <br />
        This rhyme makes no sense and it is so unfair.
        <br />
        To you dear reader for having to bear.
        <br />
        This nonsense that now for a minute you've stared.
        <br />
        I wish you had better things to care.
        <br />
      </p>
      <p>
        Now while you're at it, do check me out here:
        <br />
        Personal Blog:{' '}
        <a href="https://blog.thepushkarp.com/">Pushkar's Blog</a>
        <br />
        Tech Newsletter with{' '}
        <a
          href="https://aashutosh.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @aashutoshrathi
        </a>
        :{' '}
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
          thepushkarp
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
      <iframe
        src="https://thenibble.substack.com/embed"
        width="480"
        height="320"
        styles="border:1px solid #EEE; background:white;"
        frameBorder="0"
        scrolling="no"
        title="Nibble"
      ></iframe>
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
