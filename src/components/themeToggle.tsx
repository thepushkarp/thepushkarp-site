'use client';

import React from 'react';
import { MoonIcon, SunIcon, BlendingModeIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('system');
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9 relative transition-all duration-300 ease-in-out outline-2 outline-dashed outline-gray-300 dark:outline-gray-600 hover:bg-transparent hover:text-foreground"
          >
            <div className="relative z-20 flex items-center justify-center h-full">
              {theme === 'light' && <SunIcon className="h-6 w-6" />}
              {theme === 'dark' && <MoonIcon className="h-6 w-6" />}
              {theme === 'system' && <BlendingModeIcon className="h-6 w-6" />}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {theme === 'light' && 'Light Theme'}
          {theme === 'dark' && 'Dark Theme'}
          {theme === 'system' && 'System Theme'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
