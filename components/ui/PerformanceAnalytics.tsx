"use client";

import { useEffect, useRef } from 'react';

interface PerformanceData {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  navigationStart: number;
  domContentLoaded: number;
  loadComplete: number;
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export const PerformanceAnalytics = () => {
  const performanceData = useRef<PerformanceData>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    navigationStart: 0,
    domContentLoaded: 0,
    loadComplete: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Track navigation timing
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      performanceData.current.navigationStart = navigationEntry.startTime;
      performanceData.current.domContentLoaded = navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;
      performanceData.current.loadComplete = navigationEntry.loadEventEnd - navigationEntry.startTime;
      performanceData.current.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }

    // Track Core Web Vitals
    const trackFCP = () => {
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcpEntry) {
        performanceData.current.fcp = fcpEntry.startTime;
      }
    };

    const trackLCP = () => {
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length > 0) {
        const lastEntry = lcpEntries[lcpEntries.length - 1];
        performanceData.current.lcp = lastEntry.startTime;
      }
    };

    const trackFID = () => {
      const fidEntries = performance.getEntriesByType('first-input');
      if (fidEntries.length > 0) {
        const entry = fidEntries[0] as PerformanceEventTiming;
        performanceData.current.fid = entry.processingStart - entry.startTime;
      }
    };

    const trackCLS = () => {
      let clsValue = 0;
      const clsEntries = performance.getEntriesByType('layout-shift');
      clsEntries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      performanceData.current.cls = clsValue;
    };

    // Memory usage tracking
    const trackMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        performanceData.current.memory = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        };
      }
    };

    // Set up observers
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        performanceData.current.fcp = fcpEntry.startTime;
        trackFCP();
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        performanceData.current.lcp = lastEntry.startTime;
        trackLCP();
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const firstInputEntry = entry as PerformanceEventTiming;
        performanceData.current.fid = firstInputEntry.processingStart - firstInputEntry.startTime;
        trackFID();
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let clsValue = 0;
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      performanceData.current.cls = clsValue;
      trackCLS();
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Track memory usage periodically
    const memoryInterval = setInterval(trackMemory, 5000);

    // Send analytics after 10 seconds
    const analyticsTimeout = setTimeout(() => {
      sendAnalytics();
    }, 10000);

    // Cleanup
    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      clearInterval(memoryInterval);
      clearTimeout(analyticsTimeout);
    };
  }, []);

  const sendAnalytics = () => {
    const data = performanceData.current;
    
    // Log performance data
    console.log('Performance Analytics:', {
      'First Contentful Paint': `${data.fcp.toFixed(2)}ms`,
      'Largest Contentful Paint': `${data.lcp.toFixed(2)}ms`,
      'First Input Delay': `${data.fid.toFixed(2)}ms`,
      'Cumulative Layout Shift': `${data.cls.toFixed(3)}`,
      'Time to First Byte': `${data.ttfb.toFixed(2)}ms`,
      'DOM Content Loaded': `${data.domContentLoaded.toFixed(2)}ms`,
      'Load Complete': `${data.loadComplete.toFixed(2)}ms`,
      'Memory Usage': data.memory ? {
        'Used Heap': `${(data.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        'Total Heap': `${(data.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        'Heap Limit': `${(data.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`,
      } : 'Not available',
    });

    // Send to analytics service (if configured)
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Example: Send to Google Analytics
      // gtag('event', 'performance_metrics', data);
      
      // Example: Send to custom analytics
      // fetch('/api/analytics/performance', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
    }
  };

  return null; // This component doesn't render anything
};

export default PerformanceAnalytics; 