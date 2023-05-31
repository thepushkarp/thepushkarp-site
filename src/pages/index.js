import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  // if (posts.length === 0) {
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
        Tech Newsletter with{" "}
        <a
          href="https://aashutosh.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @aashutoshrathi
        </a>
        :{" "}
        <a
          href="https://thenibble.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nibble
        </a>
        <br />
        Substack Blog:{" "}
        <a
          href="https://theperceptron.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Perceptron
        </a>
        <br />
        Mirror Blog:{" "}
        <a
          href="https://mirror.xyz/0x2Dc33edAC5F15e328dfFfF98021D365d1C4da620"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pushkar Patel
        </a>
        <br />
        Twitter:{" "}
        <a
          href="https://twitter.com/thepushkarp"
          target="_blank"
          rel="noopener noreferrer"
        >
          @thepushkarp
        </a>
        <br />
        GitHub:{" "}
        <a
          href="https://github.com/thepushkarp"
          target="_blank"
          rel="noopener noreferrer"
        >
          thepushkarp
        </a>
        <br />
        Mail: thepushkarp[AT]gmail[DOT]com
        <br />
      </p>
    </Layout>
  )
  // }

  // return (
  //   <Layout location={location} title={siteTitle}>
  //     <Bio />
  //     <ol style={{ listStyle: `none` }}>
  //       {posts.map(post => {
  //         const title = post.frontmatter.title || post.fields.slug

  //         return (
  //           <li key={post.fields.slug}>
  //             <article
  //               className="post-list-item"
  //               itemScope
  //               itemType="http://schema.org/Article"
  //             >
  //               <header>
  //                 <h2>
  //                   <Link to={post.fields.slug} itemProp="url">
  //                     <span itemProp="headline">{title}</span>
  //                   </Link>
  //                 </h2>
  //                 <small>{post.frontmatter.date}</small>
  //               </header>
  //               <section>
  //                 <p
  //                   dangerouslySetInnerHTML={{
  //                     __html: post.frontmatter.description || post.excerpt,
  //                   }}
  //                   itemProp="description"
  //                 />
  //               </section>
  //             </article>
  //
  //         )
  //       })}
  //     </ol>
  //   </Layout>
  // )
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
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
