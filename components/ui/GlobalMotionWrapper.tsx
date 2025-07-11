"use client";

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { CursorProvider, useCursor } from './CursorContext';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isHovering } = useCursor();
  const rafRef = useRef<number | undefined>(undefined);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition]);

  return (
    <>
      {/* Dot - Always visible */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{ 
          translateX: mousePosition.x - 6, 
          translateY: mousePosition.y - 6,
          willChange: 'transform'
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 25,
          mass: 0.5
        }}
      />
      {/* Ring - Expands on hover */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9998]"
        style={{ 
          translateX: mousePosition.x - 16, 
          translateY: mousePosition.y - 16,
          willChange: 'transform'
        }}
        animate={{ scale: isHovering ? 1 : 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 25,
          mass: 0.5
        }}
      />
    </>
  );
};

export const GlobalMotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <CursorProvider>
      <CustomCursor />
      {children}
    </CursorProvider>
  );
}; 