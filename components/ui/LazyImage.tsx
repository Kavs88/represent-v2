'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function LazyImage({ 
  src, 
  alt, 
  width = 400, 
  height = 400, 
  className = '', 
  priority = false 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`[data-src="${src}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <div 
      data-src={src}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        backgroundColor: '#1a1a1a',
        backgroundImage: isLoaded ? 'none' : 'radial-gradient(circle, #333 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
} 