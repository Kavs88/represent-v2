"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PerformanceOptimizer() {
  const pathname = usePathname();

  useEffect(() => {
    // Preload critical pages for faster navigation
    const preloadPages = ['/artists', '/about', '/contact'];
    
    preloadPages.forEach(page => {
      if (pathname !== page) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      }
    });

    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
    ];

    fontLinks.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontUrl;
      link.as = 'style';
      document.head.appendChild(link);
    });

    // Optimize images loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, [pathname]);

  return null;
} 