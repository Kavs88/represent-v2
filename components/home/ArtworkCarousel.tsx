"use client";
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Attachment } from '@/types/artist';
import { motion } from 'framer-motion';

export default function ArtworkCarousel({ artworks }: { artworks: Attachment[] }) {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    skipSnaps: false,
    dragFree: false
  }, [Autoplay({ delay: 4000, stopOnInteraction: true })]);

  if (!artworks || artworks.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" role="region" aria-label="Featured artwork gallery">
      <div className="relative group">
        {/* Main Carousel with clean styling */}
        <div 
          className="overflow-hidden rounded-3xl shadow-2xl relative" 
          ref={emblaRef}
          role="group"
          aria-label="Featured artwork"
          style={{
            background: 'transparent',
            border: '1px solid rgba(23, 98, 74, 0.2)'
          }}
        >
          
                      <div className="flex relative z-10">
              {artworks.map((artwork, idx) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="min-w-0 flex-[0_0_100%] relative aspect-[4/3] flex items-center justify-center p-4 sm:p-6 lg:p-8"
                  key={artwork.id || artwork.url || idx}
                  style={{ 
                    backgroundColor: 'rgba(23, 98, 74, 0.05)',
                    border: '1px solid rgba(23, 98, 74, 0.2)'
                  }}
                >
              <Image
                src={artwork.url}
                  alt={artwork.filename || `Featured artwork ${idx + 1}`}
                fill
                  className="object-contain rounded-2xl transition-transform duration-300 hover:scale-105 drop-shadow-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority={idx === 0}
              />
                {/* Removed filename overlay - keeping clean display */}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Navigation Dots */}
        <div className="flex justify-center gap-3 mt-2">
          {artworks.map((_, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 relative"
              style={{
                backgroundColor: i === 0 
                  ? '#17624A'
                  : 'rgba(136, 136, 136, 0.4)',
                boxShadow: i === 0 
                  ? '0 0 20px rgba(23, 98, 74, 0.5), 0 0 40px rgba(23, 98, 74, 0.2)'
                  : 'none'
              }}
              aria-label={`Go to artwork ${i + 1}`}
            >
              {/* Glow effect for active dot */}
              {i === 0 && (
                <div className="absolute inset-0 rounded-full animate-pulse" style={{
                  background: 'radial-gradient(circle, rgba(23, 98, 74, 0.3) 0%, transparent 70%)'
                }}></div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
} 