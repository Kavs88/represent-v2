"use client";
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ 
          duration: 0.15, 
          ease: [0.4, 0.0, 0.2, 1], // Custom easing for smoother feel
          opacity: { duration: 0.1 } // Faster opacity transition
        }}
        style={{ willChange: 'opacity, transform' }} // Optimize for GPU
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 