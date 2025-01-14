import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { GoogleAnalytics } from '@/components/googleAnalytics';
import ReadingProgressBar from '@/components/readingProgressBar';
import ScrollToTopButton from '@/components/scrollToTopButton';
import { ThemeProvider } from '@/components/themeProvider';
import { cx } from '@/lib/utils';

import Footer from '../components/footer';
import { Navbar } from '../components/nav';

import { baseUrl } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
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
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('pushkar patel')}`,
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
    images: [`${baseUrl}/og?title=${encodeURIComponent('pushkar patel')}`],
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

const DepartureMono = localFont({ src: '../../public/fonts/DepartureMono-Regular.woff2' });
const fontClasses = `${GeistSans.variable} ${GeistMono.variable} ${DepartureMono.className}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx(fontClasses, 'dark')} suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
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
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        </ThemeProvider>
      </body>
    </html>
  );
}
