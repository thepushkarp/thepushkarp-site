import type { MDXComponents } from 'mdx/types';

import ImageWithCaption from './components/imageWithCaption';
import ImprovedLink from './components/improvedLink';
import LinkedHeading from './components/linkedHeading';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ImprovedLink,
    h1: LinkedHeading('h1'),
    h2: LinkedHeading('h2'),
    h3: LinkedHeading('h3'),
    h4: LinkedHeading('h4'),
    h5: LinkedHeading('h5'),
    h6: LinkedHeading('h6'),
    img: ImageWithCaption,
    ...components,
  };
}
