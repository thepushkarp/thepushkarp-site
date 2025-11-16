import { Menu } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { GlowingDot } from './glowingDot';

import ThemeToggle from '@/components/themeToggle';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

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
  const location = useLocation();
  const pathname = location.pathname;
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isCurrentPathActive = (path: string, pathname: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const getCurrentPageIndex = useCallback(() => {
    return navItems.findIndex(({ path }) => {
      return isCurrentPathActive(path, pathname);
    });
  }, [pathname]);

  useEffect(() => {
    setActiveIndex(getCurrentPageIndex());
  }, [getCurrentPageIndex]);

  const handleNavigation = (index: string) => {
    setIsOpen(false);
    setActiveIndex(Number(index));
  };

  return (
    <aside className="mb-16 w-full mx-auto font-departure-mono">
      <div className="flex justify-between items-center">
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="p-2">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <SheetTitle className="text-left cursor-pointer hover:text-primary transition-colors font-geist-mono">
                    pushkar patel
                  </SheetTitle>
                </Link>
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-3 font-departure-mono">
                {Object.entries(navItems).map(([index, { name, path }]) => {
                  const isActive = isCurrentPathActive(path, pathname);
                  return (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => handleNavigation(index)}
                      ref={el => {
                        navRefs.current[Number(index)] = el;
                      }}
                      className={`w-full text-left py-2 px-4 rounded-md ${
                        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {itemsWithGlowingDot.includes(name) && !isActive && (
                        <div className="relative top-1 right-1">
                          <GlowingDot />
                        </div>
                      )}
                      <span className="z-10">{name}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden lg:flex relative flex-wrap items-center gap-0">
          {activeIndex !== -1 && (
            <div
              className="absolute bottom-0 left-0 hidden lg:block outline-dashed outline-[0.2em] outline-muted transition-all duration-300 ease-out rounded-md"
              style={{
                width: navRefs.current[activeIndex]?.offsetWidth,
                height: navRefs.current[activeIndex]?.offsetHeight,
                transform: `translateX(${navRefs.current[activeIndex]?.offsetLeft || 0}px)`,
              }}
            />
          )}
          {Object.entries(navItems).map(([index, { name, path }]) => {
            const isActive = isCurrentPathActive(path, pathname);
            return (
              <Link
                key={path}
                to={path}
                onMouseEnter={() => setActiveIndex(Number(index))}
                onMouseLeave={() => setActiveIndex(getCurrentPageIndex())}
                ref={el => {
                  navRefs.current[Number(index)] = el;
                }}
                className={`group relative transition-colors py-1 px-3 lg:py-2 lg:px-5 rounded-md ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-muted-foreground'
                }`}
              >
                {itemsWithGlowingDot.includes(name) && !isActive && (
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
