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
              className="flex items-center transition-all hover:text-primary group"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
            >
              <p className="ml-2 h-7">rss</p>
              <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                <ArrowTopRightIcon className="h-3 w-3 -mt-1 group-hover:animate-nudge-top-right" />
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center transition-all hover:text-primary group"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/thepushkarp"
            >
              <p className="ml-2 h-7">twitter</p>
              <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                <ArrowTopRightIcon className="h-3 w-3 -mt-1 group-hover:animate-nudge-top-right" />
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center transition-all hover:text-primary group"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/thepushkarp"
            >
              <p className="ml-2 h-7">github</p>
              <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                <ArrowTopRightIcon className="h-3 w-3 -mt-1 group-hover:animate-nudge-top-right" />
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center transition-all hover:text-primary group"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/thepushkarp/thepushkarp-site"
            >
              <p className="ml-2 h-7">source code</p>
              <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                <ArrowTopRightIcon className="h-3 w-3 -mt-1 group-hover:animate-nudge-top-right" />
              </span>
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
