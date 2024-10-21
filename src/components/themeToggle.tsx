'use client';

import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon, BlendingModeIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!theme) {
      setTheme('system');
    } else if (theme === 'system') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('system');
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 relative transition-all duration-300 ease-in-out outline-2 outline-dashed outline-muted hover:bg-transparent hover:text-foreground"
      >
        <div className="relative z-20 flex items-center justify-center h-full">
          <BlendingModeIcon className="h-6 w-6" />
        </div>
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9 relative transition-all duration-300 ease-in-out outline-2 outline-dashed outline-muted hover:bg-transparent hover:text-foreground"
          >
            <div className="relative z-20 flex items-center justify-center h-full">
              {theme === 'light' && <SunIcon className="h-6 w-6" />}
              {theme === 'dark' && <MoonIcon className="h-6 w-6" />}
              {(theme === 'system' || !theme) && <BlendingModeIcon className="h-6 w-6" />}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {theme === 'light' && 'Light Theme'}
          {theme === 'dark' && 'Dark Theme'}
          {(theme === 'system' || !theme) && 'System Theme'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
