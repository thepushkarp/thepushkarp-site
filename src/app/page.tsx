'use client';

import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export default function Page() {
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
now while you're at it, check out my site here :)`}
      </p>
    </section>
  );
}
