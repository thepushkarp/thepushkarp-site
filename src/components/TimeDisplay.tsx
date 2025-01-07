'use client';

import { useState, useEffect } from 'react';
import timeDict from '../../public/data/time_dict.json';

export function TimeDisplay() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    function scheduleNextMinute() {
      const now = new Date();
      const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
      setTimeout(() => {
        setCurrentTime(new Date());
        scheduleNextMinute();
      }, msToNextMinute);
    }

    scheduleNextMinute();
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
    <div className="pb-8 w-full font-mono">
      <div className="text-xs">
        {day} {date}
      </div>
      <div className="text-xs mt-2" style={{ animation: 'clockBlink 2s ease-in-out infinite' }}>
        {timePoem.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}
