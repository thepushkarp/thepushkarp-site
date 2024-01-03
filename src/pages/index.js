import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

import useDeviceDetect from '../hooks/useDeviceDetect';

import * as styles from './pages.module.css';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  const device = useDeviceDetect();

  const revealEmail = () => {
    const email = 'thepushkarp[AT]gmail[DOT]com';
    const emailElement = document.querySelector('#do-not-doxx-me');
    emailElement.innerHTML = email;
    emailElement.classList.remove('hi-there-fellow-geek');
    emailElement.classList.add('i-am-doxxed');
  };

  return (
    <Layout location={location} title={siteTitle}>
      <p>Hello, I am Pushkar.</p>
      <p className={`${styles.para} ${styles.prose}`}>
        <span>
          For most of my time {device === 'mobile' && <br />}I write software.
        </span>
        <span>
          I also write other stuff {device === 'mobile' && <br />}
          that I should share.
        </span>
        <span>
          So I'm putting this site {device === 'mobile' && <br />}
          out there somewhere.
        </span>
        <span>
          To give myself a {device === 'mobile' && <br />}
          teeny-tiny little dare.
        </span>
        <span>
          To write a little more, {device === 'mobile' && <br />}
          raw and bare.
        </span>
        <span>
          Maybe I'll do that a {device === 'mobile' && <br />}
          justice square and fair.
        </span>
        <span>
          Or maybe not; {device === 'mobile' && <br />}I honestly don't care.
        </span>
        <span>
          All I want is to write {device === 'mobile' && <br />}
          with a little flair.
        </span>
        <span>
          And grow a little {device === 'mobile' && <br />}
          more self-aware.
        </span>
        <span>
          This rhyme makes no sense {device === 'mobile' && <br />}
          and it is so unfair.
        </span>
        <span>
          To you dear reader for {device === 'mobile' && <br />}
          having to bear.
        </span>
        <span>
          This nonsense that for a {device === 'mobile' && <br />}
          minute now you've stared.
        </span>
        <span>
          I wish you had {device === 'mobile' && <br />}
          better things to care.
        </span>
        <span>
          Now while you're at it {device === 'mobile' && <br />}
          do check me out here:
        </span>
      </p>
      <p className={styles.para}>
        <span>
          Personal Blog:{' '}
          <a href="https://blog.thepushkarp.com/">Pushkar's Blog</a>
        </span>
        <span>
          Tech Newsletter:{' '}
          <a
            href="https://thenibble.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nibble
          </a>
        </span>
        <span>
          Notes:{' '}
          <a
            href="https://notes.thepushkarp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pushkar's Notes
          </a>
        </span>
        <span>
          GitHub:{' '}
          <a
            href="https://github.com/thepushkarp"
            target="_blank"
            rel="noopener noreferrer"
          >
            thepushkarp
            <span className={styles.invisible}>github</span>
          </a>
        </span>
        <span>
          Twitter:{' '}
          <a
            href="https://twitter.com/thepushkarp"
            target="_blank"
            rel="noopener noreferrer"
          >
            @thepushkarp
            <span className={styles.invisible}>twiter</span>
          </a>
        </span>
        <span>
          Product Hunt:{' '}
          <a
            href="https://www.producthunt.com/@thepushkarp"
            target="_blank"
            rel="noopener noreferrer"
          >
            thepushkarp
            <span className={styles.invisible}>producthunt</span>
          </a>
        </span>
        <span>
          Mail:{' '}
          <span
            className="hi-there-fellow-geek"
            id="do-not-doxx-me"
            onClick={revealEmail}
            onKeyDown={revealEmail}
            role="button"
            tabIndex={0}
          >
            {' '}
            Click to reveal{' '}
          </span>
        </span>
      </p>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo />;

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
`;
