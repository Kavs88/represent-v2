'use client';

import { useEffect } from 'react';

export default function LoadingOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontLinks = [
        '/fonts/lora-v32-latin-700.woff2',
        '/fonts/lora-v32-latin-regular.woff2',
      ];
      
      fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
      
      // Preload critical images
      const criticalImages = [
        '/og-image.jpg',
        '/favicon.ico',
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };
    
    // Preconnect to external domains
    const preconnectToExternalDomains = () => {
      const domains = [
        'https://v5.airtableusercontent.com',
        'https://dl.airtable.com',
        'https://api.airtable.com',
      ];
      
      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });
    };
    
    // Initialize optimizations
    preloadCriticalResources();
    preconnectToExternalDomains();
    
    // Lazy load non-critical resources
    const lazyLoadNonCritical = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });
      
      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
      });
    };
    
    // Run lazy loading after initial load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', lazyLoadNonCritical);
    } else {
      lazyLoadNonCritical();
    }
  }, []);
  
  return null;
} 