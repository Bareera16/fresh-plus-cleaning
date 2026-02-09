import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Hook to handle Google Analytics page tracking for Next.js
export const useGoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      const gtag = (window as any).gtag;
      gtag('config', 'G-VY43MPH5J3', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname
      });

      gtag('config', 'AW-17525851975', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname
      });

      console.log('📊 Page view tracked:', pathname);
    }
  }, [pathname]);
};

// Function to track custom events
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', eventName, parameters);
    console.log('🎯 Event tracked:', eventName, parameters);
  } else {
    console.warn('⚠️ gtag not available for event:', eventName);
  }
};

