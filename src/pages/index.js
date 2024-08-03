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
    const email = 'hi[AT]thepushkarp[DOT]com';
    const emailElement = document.querySelector('#do-not-doxx-me');
    emailElement.innerHTML = email;
    emailElement.classList.remove('hi-nerd');
    emailElement.classList.add('i-am-doxxed');
  };

  return (
    <Layout location={location} title={siteTitle}>
      <p>Hi,</p>
      <p className={`${styles.para}`}>
        <span className={styles.prose}>
          For most of my time {device === 'mobile' && <br />}I write software.
          <br />I also write other stuff {device === 'mobile' && <br />} that I
          should share.
          <br />
          So I'm putting this site {device === 'mobile' && <br />}
          out there somewhere.
          <br />
          To give myself a {device === 'mobile' && <br />}
          teeny-tiny dare.
          <br />
          And write a little more, {device === 'mobile' && <br />}
          raw and bare.
          <br />
          Maybe I'll do that a {device === 'mobile' && <br />}
          justice square and fair.
          <br />
          Or maybe not — {device === 'mobile' && <br />}I honestly don't care.
          <br />
          All I want is to look up {device === 'mobile' && <br />}
          at the stars and stare.
          <br />
          And be a little {device === 'mobile' && <br />}
          more self-aware.
          <br />
          This rhyme makes no sense {device === 'mobile' && <br />}
          and it is so unfair;
          <br />
          To you dear reader for {device === 'mobile' && <br />}
          having to bear...
          <br />
          This nonsense that for a {device === 'mobile' && <br />}
          minute now you've stared.
          <br />I wish you had {device === 'mobile' && <br />}
          better things to care.
          <br />
          Now while you're at it, {device === 'mobile' && <br />}
          check me out here:
        </span>
      </p>
      <p className={styles.para}>
        <span>
          &gt; Tech Newsletter:{' '}
          <a
            href="https://nibbles.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Nibble
          </a>
        </span>
        <span>
          &gt; GitHub:{' '}
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
          &gt; Twitter:{' '}
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
          &gt; Mail:{' '}
          <span
            className="hi-nerd"
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
