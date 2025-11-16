import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

type ImprovedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function ImprovedLink({ href = '', children, className, ...rest }: ImprovedLinkProps) {
  const anchorClassName = cn('custom-link', className);
  const externalClassName = cn(anchorClassName, 'group');
  const { target, rel, ...anchorProps } = rest;

  if (href.startsWith('#')) {
    return (
      <a href={href} className={anchorClassName} {...anchorProps}>
        {children}
      </a>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={anchorClassName} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={externalClassName}
      target={target ?? '_blank'}
      rel={rel ?? 'noreferrer noopener'}
      {...anchorProps}
    >
      {children}
      <span className="inline-flex items-center ml-1">
        <ArrowTopRightIcon className="h-3 w-3 -mt-1 group-hover:animate-nudge-top-right" aria-hidden="true" />
      </span>
    </a>
  );
}

export default ImprovedLink;
