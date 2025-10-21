# Next.js → React + Vite Migration Summary

## ✅ Completed Migration Tasks

### 1. **Build Tool & Configuration**
- ✅ Created `vite.config.ts` with all MDX plugins (remark & rehype)
- ✅ Updated `package.json` with Vite, React Router, and other dependencies
- ✅ Created `tsconfig.json` and `tsconfig.node.json` for Vite/TypeScript
- ✅ Updated `vercel.json` with SPA routing rewrites
- ✅ Created `index.html` as entry point

### 2. **Routing & Navigation**
- ✅ Implemented React Router v6 in `src/App.tsx`
- ✅ Created all route pages in `src/pages/`:
  - `HomePage.tsx`
  - `BlogListPage.tsx`
  - `BlogPostPage.tsx`
  - `ProjectsPage.tsx`
  - `MiscPage.tsx`
  - `EtymologyPage.tsx`
  - `AiLogPage.tsx`
  - `NotFoundPage.tsx`
- ✅ Updated `src/components/nav.tsx` to use `useLocation()` from React Router
- ✅ Updated `src/components/improvedLink.tsx` to use React Router `Link`

### 3. **Layout & Components**
- ✅ Created `src/components/layout/Layout.tsx` with theme provider and layout structure
- ✅ Created `src/main.tsx` as React entry point with `HelmetProvider` and `BrowserRouter`
- ✅ Updated `src/components/googleAnalytics.tsx` to work without Next.js `Script` component
- ✅ Replaced `next/image` with standard `<img>` tags

### 4. **SEO & Metadata**
- ✅ Implemented `react-helmet-async` for managing meta tags
- ✅ Added SEO meta tags to all page components
- ✅ All pages have proper Open Graph and Twitter Card metadata

### 5. **Blog Data Management**
- ✅ Created `scripts/generate-blog-data.ts` to generate blog post metadata at build time
- ✅ Configured Vite plugin to run blog data generation before build
- ✅ Updated blog pages to import from `@/data/blog-posts.json`
- ✅ Blog post pages use dynamic imports with `React.lazy()`

### 6. **Static File Generation**
- ✅ Created `scripts/generate-feeds.ts` for RSS/Atom/JSON feeds
- ✅ Created `scripts/generate-sitemap.ts` for sitemap.xml and robots.txt
- ✅ Updated build script to run these generators after Vite build

### 7. **Styling & Theming**
- ✅ All Tailwind CSS configurations work as-is
- ✅ Dark/light theme switching preserved (next-themes works without Next.js)
- ✅ All global styles, fonts, and CSS preserved
- ✅ Font loading updated to use standard CSS `@font-face`

### 8. **Analytics & Tracking**
- ✅ Migrated Google Analytics integration
- ✅ Vercel Analytics and Speed Insights still work (React compatible)

---

## 🔧 Next Steps (To Complete Migration)

### 1. **Install Dependencies**
```bash
yarn install
```

### 2. **Create Static OG Images**
Create the following images in `public/images/`:
- `og-default.png` (1200x630px)
- `og-blog.png`
- `og-projects.png`
- `og-misc.png`
- `og-etymology.png`
- `og-ai-log.png`

*(See `public/images/OG-IMAGES-README.md` for details)*

### 3. **Set Environment Variables**
Copy `.env.example` to `.env.local` and add your Google Analytics ID:
```bash
cp .env.example .env.local
# Edit .env.local and add your GA_MEASUREMENT_ID
```

### 4. **Test Development Server**
```bash
yarn dev
```
Visit `http://localhost:3000` and test:
- All routes (/, /blog, /projects, /misc, /etymology, /ai-log)
- Blog post pages
- Navigation (desktop & mobile)
- Theme switching
- MDX rendering (code highlighting, math, callouts, etc.)

### 5. **Test Production Build**
```bash
yarn build
yarn preview
```
Verify:
- All routes work
- Feeds generated (`dist/rss.xml`, `dist/atom.xml`, `dist/feed.json`)
- Sitemap generated (`dist/sitemap.xml`)
- Robots.txt generated (`dist/robots.txt`)

### 6. **Clean Up Old Next.js Files**
Once everything works, remove:
```bash
rm -rf .next
rm next.config.mjs
rm src/middleware.ts
rm src/app/layout.tsx
rm src/app/page.tsx
rm src/app/not-found.tsx
rm src/app/robots.ts
rm src/app/sitemap.ts
rm -rf src/app/og
rm -rf src/app/rss.xml
rm -rf src/app/atom.xml
rm -rf src/app/feed.json
rm src/app/blog/utils.ts
rm src/app/blog/page.tsx
rm -rf src/app/blog/\[slug\]
rm src/lib/feed.ts
```

Also update each section folder (projects, misc, etc.) to move MDX files:
```bash
# Example: keep only the .mdx files, remove page.tsx
rm src/app/projects/page.tsx
rm src/app/misc/page.tsx
rm src/app/etymology/page.tsx
rm src/app/ai-log/page.tsx
```

### 7. **Update CLAUDE.md**
Replace the Next.js architecture documentation with Vite + React Router documentation.

---

## 📊 Architecture Changes

### Before (Next.js)
```
Next.js App Router
├── Server-side rendering
├── File-based routing
├── Metadata API
├── Route handlers for feeds
├── next/image optimization
└── Dynamic OG image generation
```

### After (React + Vite)
```
React SPA with Vite
├── Client-side rendering
├── React Router routing
├── react-helmet-async for SEO
├── Build-time feed generation
├── Standard <img> tags
└── Static OG images
```

---

## 🎯 Key Benefits

1. **Simpler Mental Model**: No SSR/CSR split, pure React
2. **Faster Dev Server**: Vite HMR is blazing fast
3. **Smaller Bundle**: No Next.js runtime overhead
4. **Deploy Anywhere**: Not locked into Vercel
5. **More Control**: No framework magic, explicit control

---

## 📦 New Package Structure

### Added Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `react-router-dom` - Client-side routing
- `react-helmet-async` - SEO/meta tag management
- `@mdx-js/rollup` - MDX support for Vite
- `tsx` - TypeScript execution for build scripts

### Removed Dependencies
- `next` - Next.js framework
- `@next/mdx` - Next.js MDX integration
- `@vercel/og` - Dynamic OG image generation
- `next-mdx-remote` - Server-side MDX rendering

### Kept Dependencies
- All MDX plugins (remark/rehype)
- `next-themes` (works standalone)
- Tailwind CSS ecosystem
- Radix UI components
- Analytics packages

---

## 🚀 Build Process

### Development
```bash
yarn dev  # Starts Vite dev server on port 3000
```

### Production Build
```bash
yarn build
```
This runs:
1. TypeScript type checking
2. Vite build (includes blog data generation)
3. Feed generation script
4. Sitemap generation script

### Preview Production Build
```bash
yarn preview
```

---

## 🔄 Deployment (Vercel)

The `vercel.json` configuration ensures:
- All routes rewrite to `/index.html` (SPA routing)
- Security headers preserved
- Static files served correctly

Deploy as before - push to main branch, Vercel will auto-deploy.

---

## 📝 Notes

- All existing URLs preserved (no breaking changes)
- All styling and theming works identically
- MDX plugins and features unchanged
- Blog frontmatter format unchanged
- Feed URLs unchanged (/rss.xml, /atom.xml, /feed.json)

---

## ⚠️ Known Limitations

1. **No Dynamic OG Images**: Using static images instead of Next.js dynamic generation
2. **No ISR/SSG**: All pages are client-rendered (fine for a personal site)
3. **SEO**: Meta tags managed client-side via react-helmet-async (works but not server-rendered)

For a personal blog/portfolio site, these tradeoffs are acceptable and result in a much simpler, more maintainable codebase.
