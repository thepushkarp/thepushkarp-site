'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/themeToggle';

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/misc': {
    name: 'misc.',
  },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="mb-16 w-full mx-auto">
      <div className="flex justify-between items-center">
        <nav className="flex items-center space-x-4">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`transition-colors py-1 px-2 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
        <div className="flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
