"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CursorProvider, useCursor } from './CursorContext';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isHovering } = useCursor();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      {/* Dot - Always visible */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{ translateX: mousePosition.x - 6, translateY: mousePosition.y - 6 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
      {/* Ring - Expands on hover */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9998]"
        style={{ translateX: mousePosition.x - 16, translateY: mousePosition.y - 16 }}
        animate={{ scale: isHovering ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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