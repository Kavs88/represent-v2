import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className = '', as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={`w-full max-w-7xl mx-auto mobile-container ${className}`}>
      {children}
    </Component>
  );
}

// Standard responsive breakpoints and utilities
export const responsiveClasses = {
  // Container widths
  container: 'max-w-7xl mx-auto',
  containerSm: 'max-w-3xl mx-auto',
  containerMd: 'max-w-4xl mx-auto',
  containerLg: 'max-w-6xl mx-auto',
  
  // Standard padding
  padding: 'px-4 sm:px-6 lg:px-8',
  paddingSm: 'px-3 sm:px-4',
  paddingLg: 'px-6 sm:px-8 lg:px-12',
  
  // Standard margins
  margin: 'my-8 sm:my-12 lg:my-16',
  marginSm: 'my-4 sm:my-6',
  marginLg: 'my-12 sm:my-16 lg:my-20',
  
  // Grid layouts
  grid: {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-3',
    large: 'xl:grid-cols-4',
  },
  
  // Flex layouts
  flex: {
    mobile: 'flex-col',
    tablet: 'md:flex-row',
    center: 'items-center justify-center',
    between: 'justify-between',
  },
  
  // Text sizes
  text: {
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    body: 'text-sm sm:text-base md:text-lg',
    small: 'text-xs sm:text-sm',
  },
  
  // Spacing
  spacing: {
    xs: 'gap-2 sm:gap-3',
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12',
  },
}; 