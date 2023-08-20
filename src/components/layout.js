import * as React from 'react';
import { Link } from 'gatsby';

import { isBrowser } from '../common/utils';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  var footerPaddingTop = 0;
  if (isBrowser()) {
    footerPaddingTop = 0.15 * window.innerHeight + 100;
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="global-footer">
        <div
          style={{ paddingTop: footerPaddingTop }}
          className="footer-content-container"
        >
          <p className="footer-disclaimer">
            [This Space Intentionally Left Blank]
            <br />
            The bottom of every page is padded so readers can maintain a
            consistent eyeline.
          </p>
          <p className="footer-content">
            © {new Date().getFullYear()}, Built with love, sweat and tears
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
