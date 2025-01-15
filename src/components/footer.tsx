'use client';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import ImprovedLink from './improvedLink';
import { RevealMail } from './revealMail';

export default function Footer() {
  const footerItems = [
    {
      label: 'twitter',
      href: 'https://twitter.com/thepushkarp',
    },
    {
      label: 'github',
      href: 'https://github.com/thepushkarp',
    },
    {
      label: 'source code',
      href: 'https://github.com/thepushkarp/thepushkarp-site',
    },
  ];

  const feedItems = [
    {
      label: 'rss',
      href: '/rss.xml',
    },
    {
      label: 'atom',
      href: '/atom.xml',
    },
    {
      label: 'json',
      href: '/feed.json',
    },
  ];

  return (
    <footer className="mb-16 font-departure-mono">
      <div className="mt-8 flex flex-col space-x-0 space-y-0.5"></div>
      <hr className="hr-footer" />
      <ul className="font-sm mt-4 flex flex-col space-x-0 space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0">
        {footerItems.map(({ label, href }) => (
          <li key={label}>
            <ImprovedLink href={href}>{label}</ImprovedLink>
          </li>
        ))}
        <li>
          <RevealMail placeholder="mail" isLink={true} />
        </li>
      </ul>
      <ul className="font-sm mt-4 flex flex-row space-x-4 space-y-0">
        {feedItems.map(({ label, href }) => (
          <li key={label}>
            <ImprovedLink href={href}>{label}</ImprovedLink>
          </li>
        ))}
      </ul>
      <div className="flex flex-row">
        <p className="mt-4">
          © {new Date().getFullYear()} Pushkar Patel
          <br />
          <span className="text-xs">built with love, sweat and llms.</span>
        </p>
      </div>
    </footer>
  );
}
