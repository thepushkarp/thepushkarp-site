import Link from 'next/link';

export const metadata = {
  title: 'misc.',
  description: 'a potpourri of things i find interesting',
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">{metadata.title}</h1>
      <p className="text-muted-foreground mb-8">{metadata.description}</p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <Link
            href="/etymology"
            className="underline transition-colors decoration-muted-foreground underline-offset-2 decoration-[0.1em] hover:bg-gray-100 dark:hover:bg-gray-800 duration-200"
          >
            etymology
          </Link>
        </li>
        <li>
          <Link
            href="/poems"
            className="underline transition-colors decoration-muted-foreground underline-offset-2 decoration-[0.1em] hover:bg-gray-100 dark:hover:bg-gray-800 duration-200"
          >
            poems
          </Link>
        </li>
      </ul>
    </section>
  );
}