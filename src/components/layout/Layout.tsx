import '@/app/globals.css';

import { GoogleAnalytics } from '@/components/googleAnalytics';
import ReadingProgressBar from '@/components/readingProgressBar';
import ScrollToTopButton from '@/components/scrollToTopButton';
import { ThemeProvider } from '@/components/themeProvider';

import Footer from '../footer';
import { Navbar } from '../nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark font-sans antialiased">
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
  );
}
