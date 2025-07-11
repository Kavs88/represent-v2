"use client";

import { useEffect, useState } from 'react';

interface LoadingOptimizerProps {
  children: React.ReactNode;
}

export const LoadingOptimizer = ({ children }: LoadingOptimizerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress for better UX
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 50);

    // Complete loading after a short delay
    const completeTimeout = setTimeout(() => {
      setLoadingProgress(100);
      setTimeout(() => setIsLoading(false), 200);
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, []);

  // Preload critical resources
  useEffect(() => {
    const preloadResources = () => {
      // Preload critical fonts
      const fontLinks = [
        '/fonts/lora/Lora-Regular.woff2',
        '/fonts/lora/Lora-Bold.woff2',
      ];

      fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = href;
        document.head.appendChild(link);
      });

      // Preload critical images
      const imageUrls = [
        '/placeholder-avatar.png',
        // Add other critical images here
      ];

      imageUrls.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadResources();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-sm text-muted-foreground">Loading...</div>
          <div className="w-48 h-1 bg-muted rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingOptimizer; 