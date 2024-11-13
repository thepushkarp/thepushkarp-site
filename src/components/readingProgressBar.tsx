'use client';

import { MIN_SCROLLABLE_HEIGHT } from '@/constants';
import { useEffect, useState } from 'react';

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > MIN_SCROLLABLE_HEIGHT) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(scrollPercent * 100);
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', updateProgress);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page Reading Progress"
      aria-valuetext={`${Math.round(progress)}%`}
      className={`${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} fixed top-0 left-0 h-0.5 bg-[hsl(var(--progress-bar))] z-[9999] transition-[width] duration-100 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.1)]`}
      style={{ width: `${progress}%` }}
    />
  );
};

export default ReadingProgressBar;
