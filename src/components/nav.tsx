'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    <aside className="mb-16 w-full max-w-[800px] mx-auto">
      <div className="flex justify-between items-center">
        <nav className="flex items-center space-x-4">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`transition-colors py-1 px-2 ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
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

function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 outline-2 outline-dashed outline-gray-300 dark:outline-gray-600 hover:bg-transparent hover:text-foreground"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <span className={theme !== 'system' && resolvedTheme === 'light' ? 'font-semibold' : ''}>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <span className={theme !== 'system' && resolvedTheme === 'dark' ? 'font-semibold' : ''}>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <span className={theme === 'system' ? 'font-semibold' : ''}>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
