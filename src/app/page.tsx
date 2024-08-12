'use client';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export default function Page() {
  const revealEmail = () => {
    const email = ' hi[AT]thepushkarp[DOT]com';
    const emailElement = document.querySelector('#do-not-doxx-me');
    if (emailElement) {
      emailElement.innerHTML = email;
      emailElement.removeAttribute('role');
    }
  };

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">pushkar patel</h1>
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
      <ul className="font-sm mt-4 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://nibbles.dev"
          >
            <ArrowTopRightIcon />
            <p className="ml-2 h-7">the nibble</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/thepushkarp"
          >
            <ArrowTopRightIcon />
            <p className="ml-2 h-7">github</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/thepushkarp"
          >
            <ArrowTopRightIcon />
            <p className="ml-2 h-7">twitter</p>
          </a>
        </li>
        <li>
          <span id="do-not-doxx-me" onClick={revealEmail} onKeyDown={revealEmail} role="button">
            mail <span className="text-xs">(click to reveal)</span>
          </span>
        </li>
      </ul>
    </section>
  );
}
