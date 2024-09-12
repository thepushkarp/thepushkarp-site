'use client';

import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isRoot = pathname === '/';

  return (
    <footer className="mb-16">
      {!isRoot && (
        <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 text-muted-foreground">
          <li>
            <Link
              className="flex items-center transition-all hover:text-primary"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
            >
              <p className="ml-2 h-7">rss</p>
              <ArrowTopRightIcon className="ml-1 h-3 w-3 -mt-1" />
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center transition-all hover:text-primary"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/thepushkarp"
            >
              <p className="ml-2 h-7">twitter</p>
              <ArrowTopRightIcon className="ml-1 h-3 w-3 -mt-1" />
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center transition-all hover:text-primary"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/thepushkarp"
            >
              <p className="ml-2 h-7">github</p>
              <ArrowTopRightIcon className="ml-1 h-3 w-3 -mt-1" />
            </Link>
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
