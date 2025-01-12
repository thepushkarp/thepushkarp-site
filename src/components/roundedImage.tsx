import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ImprovedLink from './improvedLink';

const RoundedImage = props => {
  return (
    <figure className="my-4 flex flex-col items-center">
      <Image src={props.src} alt={props.alt} className="rounded-lg" {...props} />
      {props.caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          <MDXRemote source={props.caption} components={{ a: ImprovedLink }} />
        </figcaption>
      )}
    </figure>
  );
};

export default RoundedImage;
