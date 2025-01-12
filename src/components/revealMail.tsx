'use client';

import { useState } from 'react';

export function RevealMail({ placeholder }: { placeholder: string }) {
  const reversedValue = ['moc', ']TOD[', 'prakhsupeht', ']TA[', 'ih'];
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  if (!revealed) {
    return (
      <span
        role="button"
        tabIndex={0}
        onClick={handleReveal}
        onKeyDown={handleReveal}
        className="transition-all hover:text-primary cursor-pointer"
      >
        {placeholder}
        <span className="text-xs">(click to reveal)</span>
      </span>
    );
  }

  const originalValue = Array.from(reversedValue.join('')).reverse().join('');
  return <span>{originalValue}</span>;
}
