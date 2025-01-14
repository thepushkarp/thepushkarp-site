import { Link2Icon } from '@radix-ui/react-icons';
import type { ReactNode } from 'react';

type HeadingProps = {
  id?: string;
  children?: ReactNode;
};

const LinkedHeading = (As: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  const Heading = ({ id, children }: HeadingProps) => (
    <As id={id} className="group relative inline-flex items-start">
      {children}
      <a href={`#${id}`} className="heading-anchor ml-1 opacity-0 group-hover:opacity-100">
        <Link2Icon className="inline h-4" />
      </a>
    </As>
  );
  Heading.displayName = As;
  return Heading;
};

export default LinkedHeading;
