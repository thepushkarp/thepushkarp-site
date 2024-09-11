'use client';

import { useEffect, useState } from 'react';

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(scrollPercent * 100);
    };

    window.addEventListener('scroll', updateProgress);

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 h-0.5 bg-[hsl(var(--progress-bar))] z-[9999] transition-[width] duration-100 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ReadingProgressBar;
