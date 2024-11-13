'use client';

import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export default function Footer() {
  const revealEmail = () => {
    const email = Array.from(' moc]TOD[prakhsupeht]TA[ih ').reverse().join('');
    const emailElement = document.querySelector('#do-not-doxx-me');
    if (emailElement) {
      emailElement.innerHTML = email;
      emailElement.removeAttribute('role');
      emailElement.removeAttribute('onClick');
      emailElement.removeAttribute('onKeyDown');
      emailElement.className = '';
    }
  };

  const footerItems = [
    {
      label: 'rss',
      href: '/rss',
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
    <footer className="mb-16">
      <div className="mt-8 flex flex-col space-x-0 space-y-0.5"></div>
      <hr className="border-muted border-dashed w-full border-[1.1px]" />
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
          <span
            className="transition-all hover:text-primary"
            id="do-not-doxx-me"
            onClick={revealEmail}
            onKeyDown={revealEmail}
            role="button"
          >
            mail <span className="text-xs">(click to reveal)</span>
          </span>
        </li>
      </ul>
      <div className="flex flex-row">
        <p className="mt-4">
          © {new Date().getFullYear()} Pushkar Patel
          <br />
          <span className="text-xs">built with love, sweat and tears.</span>
        </p>
      </div>
    </footer>
  );
}
