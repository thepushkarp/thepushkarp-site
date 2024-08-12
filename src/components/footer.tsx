import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export default function Footer() {
  return (
    <footer className="mb-16">
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} Pushkar Patel
        <br />
        <span className="text-xs">built with love, sweat and tears.</span>
      </p>
    </footer>
  );
}
