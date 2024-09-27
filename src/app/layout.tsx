import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from '../components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from '../components/footer';
import { baseUrl } from './sitemap';
import { ThemeProvider } from '@/components/themeProvider';
import { GoogleAnalytics } from '@/components/googleAnalytics';
import ScrollToTopButton from '@/components/scrollToTopButton';
import ReadingProgressBar from '@/components/readingProgressBar';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'pushkar patel',
    template: '%s | pushkar patel',
  },
  description: "pushkar's site.",
  authors: [{ name: 'Pushkar Patel' }],
  keywords: ['thepushkarp', 'pushkar', 'patel', 'pushkar patel'],
  creator: 'Pushkar Patel',
  publisher: 'Pushkar Patel',
  openGraph: {
    title: 'pushkar patel',
    description: "pushkar's site.",
    url: baseUrl,
    siteName: 'pushkar patel',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/android-chrome-512x512.png',
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    title: 'pushkar patel',
    description: "pushkar's site.",
    creator: '@thepushkarp',
    card: 'summary_large_image',
    images: ['/images/android-chrome-512x512.png'],
    site: '@thepushkarp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
    apple: [{ url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx(GeistSans.variable, GeistMono.variable)}>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReadingProgressBar />
          <div className="max-w-xl mx-auto px-4 py-8">
            <Navbar />
            <main className="mt-6">{children}</main>
            <Footer />
          </div>
          <ScrollToTopButton />
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        </ThemeProvider>
      </body>
    </html>
  );
}
