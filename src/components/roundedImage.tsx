import type { ImgHTMLAttributes } from 'react';

import { renderCaptionContent } from './captionContent';

import { cn } from '@/lib/utils';


type RoundedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  caption?: string;
};

const RoundedImage = ({ caption, className, ...imgProps }: RoundedImageProps) => {
  const imageClassName = cn('rounded-lg', className);

  return (
    <figure className="my-4 flex flex-col items-center">
      <img className={imageClassName} {...imgProps} />
      {caption ? (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {renderCaptionContent(caption)}
        </figcaption>
      ) : null}
    </figure>
  );
};

export default RoundedImage;
