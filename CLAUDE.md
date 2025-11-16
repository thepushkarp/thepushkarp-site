# Coding Guidelines

This file provides guidance to to AI Coding Tools when working with code in this repository.

## Development Commands

### Core Development

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Start production server (requires build first)
yarn start

# Type checking
yarn type-check
```

### Code Quality

```bash
# Run linter
yarn lint

# Auto-fix linting issues
yarn lint:fix

# Format code with Prettier
yarn format
```

### Git Hooks

- **Pre-commit**: Automatically runs `lint-staged` which:
  - Formats files with Prettier
  - Runs ESLint with auto-fix on staged TypeScript/JavaScript files
  - Only processes staged files (configured in `.lintstagedrc.js`)

## Project Architecture

### Framework & Structure

- **React 19** SPA powered by **Vite 7**
- **React Router v6** for client-side routing
- **TypeScript** with strict type checking
- **Yarn v4** (node_modules linker) as package manager
- MDX-based content management for blog posts and pages

### Directory Organization

```
src/
├── app/                    # Shared MDX content, global styles
│   ├── blog/posts/         # MDX blog posts
│   ├── ai-log/             # Section MDX files
│   ├── etymology/
│   ├── misc/
│   ├── projects/
│   ├── globals.css         # Global styles & CSS variables
│   └── starry-night.css    # Syntax highlighting styles
├── components/             # React components (layout, nav, ui, etc.)
│   └── ui/                 # shadcn/ui primitives
├── data/                   # Generated data (blog-posts.json)
├── pages/                  # React Router route components
├── scripts/                # Node scripts (feeds, sitemap, blog data)
├── lib/                    # Utilities (cn, helper functions, feed generation)
├── App.tsx                 # Router definitions
├── main.tsx                # React entry point (BrowserRouter + Helmet)
└── vite.config.ts          # Vite + MDX configuration
```

### Key Architectural Patterns

#### MDX Content Pipeline

1. **Blog Posts**: Stored as MDX files in `src/app/blog/posts/`
2. **Frontmatter**: Parsed at build time by `scripts/generate-blog-data.ts`
   which outputs `src/data/blog-posts.json`
3. **Required frontmatter fields**:
   - `title`: Post title
   - `slug`: URL-friendly identifier
   - `publishedAt`: Publication date (YYYY-MM-DD)
   - `subtitle`: Short description
   - Optional: `cleanTitle`, `cleanSubtitle`, `lastModifiedAt`, `tags`
4. **Processing**: Vite MDX plugin chain configured in `vite.config.ts`
5. **Component overrides**: Defined in `src/mdx-components.tsx`
   - All links use `ImprovedLink` (adds external link indicators)
   - All headings use `LinkedHeading` (adds anchor links)

#### MDX Plugin Stack

Configured in `vite.config.ts`:

**Remark plugins** (Markdown → AST):

- `remark-gfm`: GitHub Flavored Markdown
- `remark-math`: LaTeX math support
- `remark-breaks`: Convert line breaks to `<br>`
- `remark-emoji`: Emoji support with accessibility
- `remark-frontmatter` + `remark-mdx-frontmatter`: Frontmatter parsing
- `remark-toc`: Table of contents generation (heading: "Index")
- `remark-inline-code-lang`: Inline code language detection

**Rehype plugins** (AST → HTML):

- `rehype-katex`: Render LaTeX math equations
- `rehype-slug`: Generate heading IDs
- `rehype-callouts`: Callout/admonition support
- `rehype-starry-night`: Syntax highlighting
- `rehype-starry-night-inline`: Inline code highlighting

#### Styling System

- **Tailwind CSS 3.4**: Utility-first styling (configured in `tailwind.config.ts`)
- **CSS Variables**: Theme colors defined in `src/app/globals.css`
- **shadcn/ui**: Component library (configured in `components.json`)
  - Base color: slate
  - CSS variables enabled
  - Components in `src/components/ui/`
- **Theme Support**: Dark/light mode via `next-themes`
- **Custom fonts**: Geist (imported via `geist` package)

#### Path Aliases

Configured in `tsconfig.json`:

- `@/*` → `src/*`
- Example: `import { cn } from '@/lib/utils'`

## Content Management

### Adding a Blog Post

1. Create MDX file in `src/app/blog/posts/`
2. Add required frontmatter at the top:
   ```yaml
   ---
   title: 'Post Title'
   slug: 'post-slug'
   publishedAt: '2025-01-15'
   subtitle: 'Short description'
   ---
   ```
3. Posts are automatically sorted by `publishedAt` (newest first)
4. Access at `/blog/post-slug`

### Blog Post Features Available

- LaTeX math equations: `$inline$` or `$$display$$`
- Code blocks with syntax highlighting
- Callouts/admonitions
- Tables of contents (add `## Index` heading)
- GitHub Flavored Markdown (tables, task lists, etc.)
- Emojis with accessibility labels
- External link indicators (automatic)
- Heading anchor links (automatic)

## Important Conventions

### ESLint Rules

- Import ordering enforced (builtin → external → internal → parent → sibling)
- Newlines between import groups required
- Alphabetical sorting within groups
- Type imports preferred: `import type { Foo } from 'bar'`

### Component Patterns

- All components use TypeScript
- UI components from shadcn/ui in `src/components/ui/`
- Use `cn()` utility from `@/lib/utils` for className merging
- Dark mode support via `next-themes` ThemeProvider

### Data Sources

- Blog posts: MDX files in `src/app/blog/posts/`
- Static assets: `public/` directory
- Time rhyme data: `public/data/time_dict.json` (used by TimeDisplay)

## Deployment

- Hosted on **Vercel** (SPA rewrite directs all routes to `index.html`)
- Custom security headers configured in `vercel.json`
- Automatic deployments on push to main branch
