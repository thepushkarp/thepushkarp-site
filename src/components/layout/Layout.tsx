import '@/app/globals.css';

import Footer from '../footer';
import { Navbar } from '../nav';

import { GoogleAnalytics } from '@/components/googleAnalytics';
import ReadingProgressBar from '@/components/readingProgressBar';
import ScrollToTopButton from '@/components/scrollToTopButton';
import { ThemeProvider } from '@/components/themeProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme={false}
      disableTransitionOnChange
    >
      <div className="font-sans antialiased">
        <ReadingProgressBar />
        <div className="max-w-3xl mx-auto px-4 py-8 container">
          <Navbar />
          <main className="mt-6">{children}</main>
          <Footer />
        </div>
        <ScrollToTopButton />
        <GoogleAnalytics GA_MEASUREMENT_ID={import.meta.env.VITE_GA_MEASUREMENT_ID || ''} />
      </div>
    </ThemeProvider>
  );
}
