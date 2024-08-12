'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  // '/notes': {
  //   name: 'notes',
  // },
  // '/projects': {
  //   name: 'projects',
  // },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all flex align-middle relative py-1 px-2 m-1 hover:text-neutral-900"
                >
                  <span className={pathname === path ? 'text-neutral-900' : 'text-neutral-600'}>{name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
