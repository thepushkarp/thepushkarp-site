'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { MIN_SCROLLABLE_HEIGHT } from '@/constants';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > MIN_SCROLLABLE_HEIGHT) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className={`fixed z-50 rounded-full transition-opacity duration-300 shadow-md
              ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              bottom-4 right-4 w-10 h-10
              lg:bottom-6 lg:right-6 lg:w-12 lg:h-12`}
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            title="Scroll to Top"
            tabIndex={isVisible ? 0 : -1}
          >
            <ArrowUpIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-primary" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="font-departure-mono">Scroll to Top</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ScrollToTopButton;
