import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { ArrowTopRightIcon, Link2Icon } from '@radix-ui/react-icons';
import React from 'react';
import { ReactNode } from 'react';

function CustomLink(props) {
  const href = props.href;

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} className="custom-link">
        {props.children}
      </Link>
    );
  }

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center group custom-link">
      {props.children}
      <span className="inline-block ml-1">
        <ArrowTopRightIcon className="h-3 w-3 -mt-1 group-hover:animate-nudge-top-right" />
      </span>
    </Link>
  );
}

type HeadingProps = {
  id?: string;
  children?: ReactNode;
};

const heading = (As: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  const Heading = ({ id, children }: HeadingProps) => (
    <As id={id} className="group relative inline-flex items-start">
      {children}
      <a href={`#${id}`} className="heading-anchor ml-1 opacity-0 group-hover:opacity-100">
        <Link2Icon className="inline h-4" />
      </a>
    </As>
  );
  Heading.displayName = As;
  return Heading;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: CustomLink,
    h1: heading('h1'),
    h2: heading('h2'),
    h3: heading('h3'),
    h4: heading('h4'),
    h5: heading('h5'),
    h6: heading('h6'),
  };
}
