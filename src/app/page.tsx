'use client';

import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export default function Page() {
  const revealEmail = () => {
    const email = ' hi[AT]thepushkarp[DOT]com';
    const emailElement = document.querySelector('#do-not-doxx-me');
    if (emailElement) {
      emailElement.innerHTML = email;
      emailElement.removeAttribute('role');
      emailElement.removeAttribute('onClick');
      emailElement.removeAttribute('onKeyDown');
      emailElement.className = '';
    }
  };

  const links = [
    {
      label: 'the nibble',
      href: 'https://nibbles.dev',
    },
    {
      label: 'github',
      href: 'https://github.com/thepushkarp',
    },
    {
      label: 'twitter',
      href: 'https://twitter.com/thepushkarp',
    },
  ];

  return (
    <section>
      <h1 className="mb-8 font-semibold tracking-tighter">pushkar patel</h1>
      <p className="mb-4 whitespace-pre-wrap" style={{ lineHeight: '1.6' }}>
        {`hi,
for most of my time i write software.
i also write other stuff that i should share.
so i'm putting this site out there somewhere.
to give myself a teeny-tiny dare.
and write a little more, raw and bare.
maybe i'll do that a justice square and fair.
or maybe not — i honestly don't care.
all i want is to look up at the stars and stare.
and be a little more self-aware.
this rhyme makes no sense and it is so unfair;
to you dear reader for having to bear...
this nonsense that for a minute now you've stared.
i wish you had better things to care.
now while you're at it, check me out here:`}
      </p>
      <ul className="font-sm mt-4 flex flex-col space-x-0 space-y-2 text-muted-foreground md:flex-row md:space-x-4 md:space-y-0">
        {links.map(link => (
          <li key={link.href}>
            <Link
              className="flex items-center transition-all hover:text-primary group"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              <p className="ml-2 h-7">{link.label}</p>
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
    </section>
  );
}
