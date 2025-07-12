'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Track page load performance
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log('Page Load Time:', navEntry.loadEventEnd - navEntry.loadEventStart);
            console.log('DOM Content Loaded:', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });

      // Track Core Web Vitals
      const observerCLS = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as any;
          console.log('CLS:', layoutShift.value);
        }
      });

      const observerLCP = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('LCP:', entry.startTime);
        }
      });

      const observerFID = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const firstInput = entry as any;
          console.log('FID:', firstInput.processingStart - entry.startTime);
        }
      });

      observerCLS.observe({ entryTypes: ['layout-shift'] });
      observerLCP.observe({ entryTypes: ['largest-contentful-paint'] });
      observerFID.observe({ entryTypes: ['first-input'] });

      return () => {
        observer.disconnect();
        observerCLS.disconnect();
        observerLCP.disconnect();
        observerFID.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
} 