'use client';

import { useState, useEffect } from 'react';
import timeDict from '../../public/data/time_dict.json';

export function TimeDisplay() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTime(new Date());
        setIsTransitioning(false);
      }, 300);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted || !currentTime) return null;

  const day = currentTime.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
  const date = currentTime
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .replace(',', '')
    .toLowerCase();
  const hour = String(currentTime.getHours()).padStart(2, '0');
  const minute = String(currentTime.getMinutes()).padStart(2, '0');
  const poemKey = `${hour}:${minute}`;
  const timePoem = timeDict[poemKey]?.toLowerCase() || 'have a good day!';

  return (
    <aside className="ml-8 w-1/3 lg:w-1/4 font-mono">
      <div className="text-xs">
        {day} {date}
      </div>
      <div className={`text-sm mt-2 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {timePoem.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </aside>
  );
}
