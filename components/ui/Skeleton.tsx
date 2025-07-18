import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Skeleton({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4', 
  rounded = 'md' 
}: SkeletonProps) {
  const roundedClass = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }[rounded];

  return (
    <div 
      className={`animate-pulse bg-gray-700/50 ${width} ${height} ${roundedClass} ${className}`}
    />
  );
}

// Pre-built skeleton components
export function ArtistCardSkeleton() {
  return (
    <div className="w-full max-w-xs min-h-[400px] h-full flex flex-col justify-between bg-card rounded-xl border border-border shadow-lg overflow-hidden px-6 py-6">
      {/* Top: Image skeleton */}
      <div className="flex flex-col items-center pt-2 pb-4">
        <Skeleton 
          width="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48" 
          height="h-28 sm:h-36 md:h-44 lg:h-48" 
          rounded="full" 
          className="bg-gray-600"
        />
      </div>
      {/* Middle: Content skeletons */}
      <div className="flex-1 flex flex-col items-center justify-center gap-y-2">
        <Skeleton width="w-3/4" height="h-6" className="mx-auto" />
        <Skeleton width="w-1/2" height="h-4" className="mx-auto" />
        <div className="flex justify-center gap-2 mt-2">
          <Skeleton width="w-16" height="h-6" rounded="full" />
          <Skeleton width="w-20" height="h-6" rounded="full" />
        </div>
      </div>
      {/* Bottom: CTA skeleton */}
      <div className="flex items-center justify-center pt-4 pb-2">
        <Skeleton width="w-24" height="h-4" className="mx-auto" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-border shadow-lg flex flex-col">
      <Skeleton width="w-full" height="h-32 sm:h-36 lg:h-40" className="bg-gray-600" />
      <div className="p-4 sm:p-6 flex-1 flex flex-col gap-2">
        <Skeleton width="w-3/4" height="h-5" />
        <Skeleton width="w-full" height="h-4" />
        <div className="mt-auto flex flex-col gap-2">
          <Skeleton width="w-1/3" height="h-4" />
          <Skeleton width="w-1/4" height="h-6" rounded="full" />
        </div>
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border">
      <div className="flex items-start gap-4">
        <Skeleton width="w-12" height="h-12" rounded="full" />
        <div className="flex-1 space-y-2">
          <Skeleton width="w-1/3" height="h-4" />
          <Skeleton width="w-full" height="h-4" />
          <Skeleton width="w-2/3" height="h-4" />
        </div>
      </div>
    </div>
  );
} 