import Link from 'next/link';

export const metadata = {
  title: 'misc.',
  description: 'a collection of things i find interesting',
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-2 tracking-tighter">misc.</h1>
      <p className="text-muted-foreground mb-8">a potpourri of things i find interesting</p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <Link href="/etymology">etymology</Link>
        </li>
        <li>
          <Link href="/poems">poems</Link>
        </li>
      </ul>
    </section>
  );
}
