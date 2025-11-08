import { useEffect } from 'react';

export const GoogleAnalytics = ({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) => {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Load gtag.js script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }, [GA_MEASUREMENT_ID]);

  return null;
};
