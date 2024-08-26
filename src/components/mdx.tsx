import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import React from 'react';
import 'katex/dist/katex.min.css';

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return (
    <div className="my-4 flex justify-center">
      <Image alt={props.alt} className="rounded-lg" {...props} />
    </div>
  );
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code className="font-mono" dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function createHeading(level) {
  return function Heading({ children }) {
    let slug = slugify(children);
    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement('a', {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: 'anchor',
      }),
      children,
    ]);
  };
}

function Poetry({ children }) {
  return <div className="whitespace-pre-wrap">{children}</div>;
}

function PoetryAuthor({ children }) {
  return <div className="italic">{children}</div>;
}

function HorizontalRule() {
  return <hr className="my-4" />;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Poetry: Poetry,
  PoetryAuthor: PoetryAuthor,
  hr: HorizontalRule,
};

export function CustomMDX(mdxSource) {
  return (
    <MDXRemote
      {...mdxSource}
      components={{ ...components, ...(mdxSource.components || {}) }}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex] } }}
    />
  );
}
