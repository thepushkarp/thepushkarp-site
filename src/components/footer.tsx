'use client';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isRoot = pathname === '/';
  const isBlogRelated = pathname === '/blog' || pathname.startsWith('/blog/');

  return (
    <footer className="mb-16">
      {!isRoot && (
        <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 text-muted-foreground">
          {isBlogRelated && (
            <li>
              <a
                className="flex items-center transition-all hover:text-primary"
                rel="noopener noreferrer"
                target="_blank"
                href="/rss"
              >
                <ArrowTopRightIcon />
                <p className="ml-2 h-7">rss</p>
              </a>
            </li>
          )}
          <li>
            <a
              className="flex items-center transition-all hover:text-primary"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/thepushkarp"
            >
              <ArrowTopRightIcon />
              <p className="ml-2 h-7">twitter</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center transition-all hover:text-primary"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/thepushkarp"
            >
              <ArrowTopRightIcon />
              <p className="ml-2 h-7">github</p>
            </a>
          </li>
        </ul>
      )}
      <p className="mt-8">
        © {new Date().getFullYear()} Pushkar Patel
        <br />
        <span className="text-xs">built with love, sweat and tears.</span>
      </p>
    </footer>
  );
}
