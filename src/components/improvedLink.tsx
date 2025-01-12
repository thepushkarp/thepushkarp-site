import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

function ImprovedLink(props) {
  const href = props.href;

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} className="custom-link">
        {props.children}
      </Link>
    );
  }

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center group custom-link">
      {props.children}
      <span className="inline-block ml-1">
        <ArrowTopRightIcon className="h-3 w-3 -mt-1 group-hover:animate-nudge-top-right" />
      </span>
    </Link>
  );
}

export default ImprovedLink;
