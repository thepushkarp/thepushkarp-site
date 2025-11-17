import type { ReactNode } from 'react';

import ImprovedLink from './improvedLink';

export function renderCaptionContent(text?: string): ReactNode {
  if (!text) {
    return null;
  }

  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    nodes.push(
      <ImprovedLink key={`${match[2]}-${match.index}`} href={match[2]}>
        {match[1]}
      </ImprovedLink>
    );

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
