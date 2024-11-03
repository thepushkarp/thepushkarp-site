'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/themeToggle';
import { GlowingDot } from './glowingDot';

const navItems = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'blog',
    path: '/blog',
  },
  {
    name: 'projects',
    path: '/projects',
  },
  {
    name: 'misc.',
    path: '/misc',
  },
];

const itemsWithGlowingDot: string[] = [];

export function Navbar() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const getCurrentPageIndex = useCallback(() => {
    return navItems.findIndex(({ path }) => path === pathname);
  }, [pathname]);

  useEffect(() => {
    setActiveIndex(getCurrentPageIndex());
  }, [getCurrentPageIndex]);

  return (
    <aside className="mb-16 w-full mx-auto">
      <div className="flex justify-between items-center">
        <nav className="relative flex flex-wrap items-center gap-0">
          {activeIndex !== -1 && (
            <div
              className="absolute bottom-0 left-0 hidden lg:block outline-dashed outline-muted transition-all duration-300 ease-out rounded-md"
              style={{
                width: navRefs.current[activeIndex]?.offsetWidth,
                height: navRefs.current[activeIndex]?.offsetHeight,
                transform: `translateX(${navRefs.current[activeIndex]?.offsetLeft || 0}px)`,
              }}
            />
          )}
          {Object.entries(navItems).map(([index, { name, path }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                passHref
                onMouseEnter={() => setActiveIndex(Number(index))}
                onMouseLeave={() => setActiveIndex(getCurrentPageIndex())}
                ref={el => {
                  navRefs.current[index] = el;
                }}
                className={`group relative transition-colors py-1 px-3 lg:py-2 lg:px-5 rounded-md ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-muted-foreground'
                }`}
              >
                {itemsWithGlowingDot.includes(path) && !isActive && (
                  <div className="absolute top-1 right-1">
                    <GlowingDot />
                  </div>
                )}
                <span className="z-10">{name}</span>
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
