import '@/app/globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { GoogleAnalytics } from '@/components/googleAnalytics';
import ReadingProgressBar from '@/components/readingProgressBar';
import ScrollToTopButton from '@/components/scrollToTopButton';
import { ThemeProvider } from '@/components/themeProvider';
import { cx } from '@/lib/utils';

import Footer from '../footer';
import { Navbar } from '../nav';

// Load DepartureMono font
const fontFaceStyle = `
  @font-face {
    font-family: 'Departure Mono';
    src: url('/fonts/DepartureMono-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

const fontClasses = `${GeistSans.variable} ${GeistMono.variable}`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{fontFaceStyle}</style>
      <div className={cx(fontClasses, 'dark font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme={false}
          disableTransitionOnChange
        >
          <ReadingProgressBar />
          <div className="max-w-3xl mx-auto px-4 py-8 container">
            <Navbar />
            <main className="mt-6">{children}</main>
            <Footer />
          </div>
          <ScrollToTopButton />
          <GoogleAnalytics GA_MEASUREMENT_ID={import.meta.env.VITE_GA_MEASUREMENT_ID || ''} />
        </ThemeProvider>
      </div>
    </>
  );
}
