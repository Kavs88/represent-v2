"use client";

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Attachment } from '@/types/artist';
import { motion } from 'framer-motion';

export function ArtworkCarousel({ artworks, themeColor }: { artworks: Attachment[]; themeColor?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    skipSnaps: false,
    dragFree: false
  }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Update selected index on slide change
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!artworks || artworks.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto" role="region" aria-label="Artwork gallery">
      <div className="relative group">
        {/* Main Carousel */}
        <div 
          className="overflow-hidden rounded-3xl shadow-2xl" 
          ref={emblaRef}
          role="group"
          aria-label={`Artwork ${selectedIndex + 1} of ${artworks.length}`}
        >
          <div className="flex">
            {artworks.map((artwork, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="min-w-0 flex-[0_0_100%] relative aspect-[16/10] flex items-center justify-center p-4"
                key={artwork.id || artwork.url || idx}
                style={{ 
                  backgroundColor: themeColor ? `${themeColor}10` : 'var(--card)',
                  border: `1px solid ${themeColor ? `${themeColor}20` : 'var(--border)'}`
                }}
              >
                <Image
                  src={artwork.url}
                  alt={artwork.filename || `Artwork ${idx + 1}`}
                  fill
                  className="object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority={idx === 0}
                />
                {/* Artwork Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold text-lg">
                    {artwork.filename || `Artwork ${idx + 1}`}
                  </h3>
                  <p className="text-white/80 text-sm">Click to view full size</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Navigation Buttons */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full z-10 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Previous artwork"
          disabled={selectedIndex === 0}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full z-10 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Next artwork"
          disabled={selectedIndex === artworks.length - 1}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Progress Indicator */}
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2"
          role="status"
          aria-live="polite"
          aria-label={`Artwork ${selectedIndex + 1} of ${artworks.length}`}
        >
          <span className="text-white text-sm font-medium">
            {selectedIndex + 1} / {artworks.length}
          </span>
        </div>
      </div>

      {/* Enhanced Dots Navigation */}
      <div className="flex justify-center gap-3 mt-8">
        {artworks.map((_, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
                         className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125`}
             style={{
               backgroundColor: i === selectedIndex 
                 ? (themeColor || '#00ff9d')
                 : 'rgba(136, 136, 136, 0.4)',
               boxShadow: i === selectedIndex 
                 ? `0 0 20px ${themeColor ? `${themeColor}50` : 'rgba(0, 255, 157, 0.5)'}`
                 : 'none'
             }}
            aria-label={`Go to artwork ${i + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail Preview */}
      <div className="mt-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {artworks.map((artwork, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
                             className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 hover:scale-110`}
               style={{
                 border: i === selectedIndex 
                   ? `2px solid ${themeColor || '#00ff9d'}`
                   : '1px solid rgba(64, 64, 64, 0.5)',
                 boxShadow: i === selectedIndex 
                   ? `0 0 0 4px #0E0E0E, 0 0 0 6px ${themeColor || '#00ff9d'}`
                   : 'none'
               }}
            >
              <Image
                src={artwork.url}
                alt={artwork.filename || `Thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
              {i === selectedIndex && (
                <div className="absolute inset-0 bg-theme-primary/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-theme-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArtworkCarouselPlaceholder() {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {Array.from({ length: 3 }, (_, index) => (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative aspect-square bg-card/50 rounded-2xl border border-border/50 flex items-center justify-center"
        >
          <svg className="w-16 h-16 text-muted/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
} 