import type { ImgHTMLAttributes } from 'react';

import { renderCaptionContent } from './captionContent';

import { cn } from '@/lib/utils';

type ImageWithCaptionProps = ImgHTMLAttributes<HTMLImageElement> & {
  title?: string;
};

const ImageWithCaption = ({ title, className, ...imgProps }: ImageWithCaptionProps) => {
  const imageClassName = cn('rounded-lg', className);

  if (title) {
    return (
      <figure className="my-4 flex flex-col items-center">
        <img {...imgProps} className={imageClassName} />
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {renderCaptionContent(title)}
        </figcaption>
      </figure>
    );
  }

  return <img {...imgProps} className={imageClassName} />;
};

export default ImageWithCaption;
