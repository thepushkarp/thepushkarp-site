import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

import NibbleSubstackSignupForm from '../components/signupForms/nibbleSignup';

import useOnScreen from '../hooks/useOnScreen';
import useDeviceDetect from '../hooks/useDeviceDetect';

import * as styles from './pages.module.css';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  const ref = React.useRef();
  const onScreen = useOnScreen(ref, '0px');
  const device = useDeviceDetect();
  let showWidget;
  if (onScreen) {
    showWidget = true;
  }

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
      <p>
        For most of my time,
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        I write software.
        <br />
        <br />I also write other stuff,
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        that I should share.
        <br />
        <br />
        So I'm putting this site
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        out there somewhere.
        <br />
        <br />
        To give myself a{device === 'mobile' && <br />}{' '}
        {/* Line break for mobile */}
        teeny-tiny little dare.
        <br />
        <br />
        To write a little more,
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        raw and bare.
        <br />
        <br />
        Maybe I'll do that a{device === 'mobile' && <br />}{' '}
        {/* Line break for mobile */}
        justice square and fair.
        <br />
        <br />
        Or maybe not;
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        I honestly don't care.
        <br />
        <br />
        All I want is to write
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        with a little flair.
        <br />
        <br />
        And grow a little
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        more self-aware.
        <br />
        <br />
        This rhyme makes no sense
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        and it is so unfair.
        <br />
        <br />
        To you dear reader for
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        having to bear.
        <br />
        <br />
        This nonsense that for a{device === 'mobile' && <br />}{' '}
        {/* Line break for mobile */}
        minute now you've stared.
        <br />
        <br />I wish you had
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        better things to care.
      </p>
      <p>
        Now while you're at it,
        {device === 'mobile' && <br />} {/* Line break for mobile */}
        do check me out here:
        <br />
        <br />
        Personal Blog:{' '}
        <a href="https://blog.thepushkarp.com/">Pushkar's Blog</a>
        <br />
        Tech Newsletter:{' '}
        <a
          href="https://thenibble.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nibble
        </a>
        <br />
        Notes:{' '}
        <a
          href="https://notes.thepushkarp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pushkar's Notes
        </a>
        <br />
        GitHub:{' '}
        <a
          href="https://github.com/thepushkarp"
          target="_blank"
          rel="noopener noreferrer"
        >
          thepushkarp
          <span className={styles.invisible}>github</span>
        </a>
        <br />
        Twitter:{' '}
        <a
          href="https://twitter.com/thepushkarp"
          target="_blank"
          rel="noopener noreferrer"
        >
          @thepushkarp
          <span className={styles.invisible}>twiter</span>
        </a>
        <br />
        Product Hunt:{' '}
        <a
          href="https://www.producthunt.com/@thepushkarp"
          target="_blank"
          rel="noopener noreferrer"
        >
          thepushkarp
          <span className={styles.invisible}>producthunt</span>
        </a>
        <br />
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
        <br />
      </p>
      <div className="iframe-container" ref={ref}>
        {showWidget && <NibbleSubstackSignupForm />}
      </div>
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
