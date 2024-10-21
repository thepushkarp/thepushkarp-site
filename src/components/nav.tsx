'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/themeToggle';
import { GlowingDot } from './glowingDot';

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/projects': {
    name: 'projects',
  },
  '/misc': {
    name: 'misc.',
  },
};

const itemsWithGlowingDot: string[] = [];

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="mb-16 w-full mx-auto">
      <div className="flex justify-between items-center">
        <nav className="flex flex-wrap items-center  gap-4">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`relative transition-colors py-1 px-2 md:py-2 md:px-3 rounded-md ${
                  isActive
                    ? 'text-primary pointer-events-none'
                    : 'text-muted-foreground hover:text-primary lg:hover:outline-2 lg:hover:outline-dashed lg:hover:outline-muted'
                }`}
              >
                {itemsWithGlowingDot.includes(path) && !isActive && (
                  <div className="absolute top-1 right-1">
                    <GlowingDot />
                  </div>
                )}
                {name}
              </Link>
            );
          })}
        </nav>
        <div className="flex-shrink-0 ml-4">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
