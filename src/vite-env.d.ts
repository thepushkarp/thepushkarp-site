/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { MDXComponents } from 'mdx/types';
  import type { ComponentType } from 'react';
  const Component: ComponentType<{ components?: MDXComponents }>;
  export default Component;
}

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
