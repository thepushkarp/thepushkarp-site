'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from '@radix-ui/react-icons';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
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
    <Button
      variant="secondary"
      size="icon"
      className={`fixed z-50 rounded-full transition-opacity duration-300 shadow-sm
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        bottom-4 right-4 w-10 h-10
        lg:bottom-6 lg:right-6 lg:w-16 lg:h-16`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUpIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-primary" />
    </Button>
  );
};

export default ScrollToTopButton;
