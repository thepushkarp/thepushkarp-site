'use client';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { RevealMail } from './revealMail';

export default function Footer() {
  const footerItems = [
    {
      label: 'rss',
      href: '/rss.xml',
    },
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

  return (
    <footer className="mb-16 font-departure-mono">
      <div className="mt-8 flex flex-col space-x-0 space-y-0.5"></div>
      <hr className="hr-footer" />
      <ul className="font-sm mt-4 flex flex-col space-x-0 space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0 text-muted-foreground">
        {footerItems.map(({ label, href }) => (
          <li key={label}>
            <Link
              className="flex items-center transition-all hover:text-primary group"
              rel="noopener noreferrer"
              target="_blank"
              href={href}
            >
              <p className="h-7">{label}</p>
              <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                <ArrowTopRightIcon className="h-3 w-3 -mt-1 group-hover:animate-nudge-top-right" />
              </span>
            </Link>
          </li>
        ))}
        <li>
          <RevealMail placeholder="mail" isLink={false} />
        </li>
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
