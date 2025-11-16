const RoundedImage = (props: any) => {
  return (
    <figure className="my-4 flex flex-col items-center">
      <img src={props.src} alt={props.alt} className="rounded-lg" {...props} />
      {props.caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{props.caption}</figcaption>
      )}
    </figure>
  );
};

export default RoundedImage;
