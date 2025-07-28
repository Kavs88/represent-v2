"use client";

import { useEffect, useState } from 'react';

interface MobileOptimizerProps {
  children: React.ReactNode;
}

export function MobileOptimizer({ children }: MobileOptimizerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    // Detect low power mode (iOS)
    const checkLowPowerMode = () => {
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          setIsLowPowerMode(battery.level < 0.2);
        });
      }
    };

    checkMobile();
    checkLowPowerMode();

    // Listen for battery changes
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        battery.addEventListener('levelchange', checkLowPowerMode);
        return () => battery.removeEventListener('levelchange', checkLowPowerMode);
      });
    }

    // Listen for resize events
    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply mobile optimizations
  useEffect(() => {
    if (isMobile) {
      // Reduce motion for better performance
      document.documentElement.style.setProperty('--reduced-motion', 'reduce');
      
      // Optimize touch scrolling
      (document.body.style as any).webkitOverflowScrolling = 'touch';
      
      // Disable hover effects on mobile
      document.documentElement.classList.add('mobile-device');
    }

    if (isLowPowerMode) {
      // Further reduce animations for low power mode
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
      document.documentElement.classList.add('low-power-mode');
    }

    return () => {
      document.documentElement.style.removeProperty('--reduced-motion');
      document.documentElement.style.removeProperty('--animation-duration');
      document.documentElement.classList.remove('mobile-device', 'low-power-mode');
    };
  }, [isMobile, isLowPowerMode]);

  return <>{children}</>;
} 