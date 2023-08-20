import * as React from 'react';
import { Link } from 'gatsby';

import { isBrowser } from '../../common/utils';

import * as styles from './layout.module.css';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className={styles.mainHeading}>
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className={styles.headerLinkHome} to="/">
        {title}
      </Link>
    );
  }

  var footerPaddingTop = 0;
  if (isBrowser()) {
    footerPaddingTop = 0.15 * window.innerHeight + 100;
  }

  return (
    <div className={styles.globalWrapper} data-is-root-path={isRootPath}>
      <header className={styles.globalHeader}>{header}</header>
      <main>{children}</main>
      <footer className={styles.globalFooter}>
        <div
          style={{ paddingTop: footerPaddingTop }}
          className={styles.footerContentContainer}
        >
          <p className={styles.footerDisclaimer}>
            [This Space Intentionally Left Blank]
            <br />
            The bottom of every page is padded so readers can maintain a
            consistent eyeline.
          </p>
          <p className={styles.footerContent}>
            © {new Date().getFullYear()}, Built with love, sweat and tears
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
