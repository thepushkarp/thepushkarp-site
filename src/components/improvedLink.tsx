import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

function ImprovedLink(props) {
  const href = props.href;

  // Handle anchor links (same page)
  if (href.startsWith('#')) {
    return (
      <a href={href} className="custom-link">
        {props.children}
      </a>
    );
  }

  // Handle internal links
  if (href.startsWith('/')) {
    return (
      <Link to={href} className="custom-link">
        {props.children}
      </Link>
    );
  }

  // Handle external links
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group custom-link">
      {props.children}
      <span className="inline-flex items-center ml-1">
        <ArrowTopRightIcon className="h-3 w-3 -mt-1 group-hover:animate-nudge-top-right" />
      </span>
    </a>
  );
}

export default ImprovedLink;
