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
            className="group w-9 h-9 relative transition-all ease-in-out outline-dashed outline-muted outline-[0.2em] hover:bg-transparent hover:text-primary"
          >
            <span className="sr-only">Toggle theme</span>
            <div className="relative z-20 flex items-center justify-center h-full w-full">
              <div className="relative w-6 h-6">
                <MoonIcon
                  className="h-6 w-6 absolute transition-all duration-100 ease-in-out"
                  style={{
                    opacity: resolvedTheme === 'dark' ? 1 : 0,
                    transform: `scale(${resolvedTheme === 'dark' ? 1 : 0.5})`,
                  }}
                />
                <SunIcon
                  className="h-6 w-6 absolute transition-all duration-100 ease-in-out"
                  style={{
                    opacity: resolvedTheme === 'light' ? 1 : 0,
                    transform: `scale(${resolvedTheme === 'light' ? 1 : 0.5})`,
                  }}
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
