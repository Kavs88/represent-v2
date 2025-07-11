"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading component for dynamic imports
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Dynamic imports for heavy components
export const DynamicArtworkCarousel = dynamic(
  () => import('@/components/home/ArtworkCarousel'),
  {
    loading: LoadingSpinner,
    ssr: false, // Disable SSR for carousel to reduce bundle size
  }
);

export const DynamicArticlesSection = dynamic(
  () => import('@/components/home/ArticlesSection'),
  {
    loading: LoadingSpinner,
    ssr: true,
  }
);

export const DynamicContactModal = dynamic(
  () => import('@/components/ui/ContactModal'),
  {
    loading: LoadingSpinner,
    ssr: false,
  }
);

export const DynamicArtistFilterableGrid = dynamic(
  () => import('@/components/artists/ArtistFilterableGrid'),
  {
    loading: LoadingSpinner,
    ssr: true,
  }
);

// Wrapper component for dynamic imports with Suspense
export const DynamicComponentWrapper = ({ 
  children, 
  fallback = <LoadingSpinner /> 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Preload function for critical components
export const preloadComponent = (componentName: string) => {
  switch (componentName) {
    case 'ArtworkCarousel':
      import('@/components/home/ArtworkCarousel');
      break;
    case 'ArticlesSection':
      import('@/components/home/ArticlesSection');
      break;
    case 'ContactModal':
      import('@/components/ui/ContactModal');
      break;
    case 'ArtistFilterableGrid':
      import('@/components/artists/ArtistFilterableGrid');
      break;
    default:
      break;
  }
};

// Export individual components for better tree shaking
export default {
  DynamicArtworkCarousel,
  DynamicArticlesSection,
  DynamicContactModal,
  DynamicArtistFilterableGrid,
  DynamicComponentWrapper,
  preloadComponent
}; 