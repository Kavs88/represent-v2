"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const EnhancedHero = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  // Initialize particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          opacity: particle.opacity + (Math.random() - 0.5) * 0.1,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden py-20 px-4"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)' }}
    >
      {/* Interactive Particle Background */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-primary/20 to-green-500/20"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary to-green-500 rounded-full blur-3xl opacity-20"
        style={{ y: springY1 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-primary to-green-500 rounded-full blur-3xl opacity-20"
        style={{ y: springY2 }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Interactive Mouse Follower */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-full blur-2xl pointer-events-none z-0"
        style={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        style={{ opacity: springOpacity }}
      >
        {/* Enhanced Typography */}
        <motion.h1 
          className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <AnimatedText 
            text="DISCOVER" 
            el="span" 
            className="block text-white drop-shadow-2xl" 
          />
          <motion.div
            className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-primary"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            <AnimatedText text="EXCEPTIONAL" el="span" delay={0.3} />
          </motion.div>
          <AnimatedText text="TALENT" el="span" className="block text-white drop-shadow-2xl" delay={0.6} />
        </motion.h1>

        {/* Enhanced Subtitle */}
        <RevealOnScroll delay={1.2}>
          <motion.p 
            className="text-lg md:text-xl text-muted/80 max-w-2xl mx-auto mt-6 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            A curated platform showcasing the most innovative contemporary artists from around the world.
          </motion.p>
        </RevealOnScroll>

        {/* Enhanced CTA Button */}
        <RevealOnScroll delay={1.4}>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Link href="/artists">
              <MagneticButton className="group">
                <motion.span 
                  className="px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 bg-gradient-to-r from-[#17624A] to-green-600 text-white inline-block relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(23, 98, 74, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Button Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Explore the Roster</span>
                </motion.span>
              </MagneticButton>
            </Link>
          </motion.div>
        </RevealOnScroll>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-green-400 rounded-full opacity-60"
          animate={{
            y: [0, 20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero; 