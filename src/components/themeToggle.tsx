'use client';

import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    if (resolvedTheme === 'light') setTheme('dark');
    else setTheme('light');
  };

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="group w-9 h-9 relative transition-all duration-300 ease-in-out outline-dashed outline-muted hover:bg-transparent hover:text-primary"
          >
            <span className="sr-only">Toggle theme</span>
            <div className="relative z-20 flex items-center justify-center h-full w-full origin-center">
              <div className="absolute">
                <MoonIcon
                  className="h-6 w-6 transition-opacity"
                  style={{ opacity: resolvedTheme === 'dark' ? 1 : 0 }}
                />
                <SunIcon
                  className="h-6 w-6 absolute top-0 left-0 transition-opacity"
                  style={{ opacity: resolvedTheme === 'light' ? 1 : 0 }}
                />
              </div>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle Theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
