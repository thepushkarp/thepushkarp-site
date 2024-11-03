'use client';

import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon, BlendingModeIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
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
            className="w-9 h-9 relative transition-all duration-300 ease-in-out outline-dashed outline-muted hover:bg-transparent hover:text-primary"
          >
            <span className="sr-only">Toggle theme</span>
            <div className="relative z-20 flex items-center justify-center h-full hover:animate-wiggle">
              <BlendingModeIcon
                className="h-6 w-6 absolute transition-opacity"
                style={{ opacity: theme === 'system' ? 1 : 0 }}
              />
              <MoonIcon className="h-6 w-6 absolute transition-opacity" style={{ opacity: theme === 'dark' ? 1 : 0 }} />
              <SunIcon className="h-6 w-6 absolute transition-opacity" style={{ opacity: theme === 'light' ? 1 : 0 }} />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{(theme || 'system').charAt(0).toUpperCase() + (theme || 'system').slice(1)} theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
