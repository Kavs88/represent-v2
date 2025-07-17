"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Artist, Attachment } from '@/types/artist';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

interface FeaturedArtistsGridProps {
  featuredArtists: Artist[];
}

export default function FeaturedArtistsGrid({ featuredArtists }: FeaturedArtistsGridProps) {
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);

  // Create a masonry-style layout with artwork
  const artworkItems = useMemo(() => {
    const items: Array<{
      id: string;
      artistId: string;
      artistName: string;
      artwork: Attachment;
      themeColor: string;
      aspectRatio: number;
    }> = [];

    featuredArtists.forEach(artist => {
      if (artist.fields.Artwork && artist.fields.Artwork.length > 0) {
        // Take up to 3 artworks per artist for variety
        const artistArtworks = artist.fields.Artwork.slice(0, 3);
        
        artistArtworks.forEach((artwork, index) => {
          // Calculate aspect ratio for layout optimization (default to 1 if not available)
          const aspectRatio = 1; // Default to square aspect ratio
          
          items.push({
            id: `${artist.id}-${artwork.id || index}`,
            artistId: artist.id,
            artistName: artist.fields.Name,
            artwork,
            themeColor: artist.fields.ThemePrimaryColor || '#00ff9d',
            aspectRatio
          });
        });
      }
    });

    // Sort by aspect ratio to create an interesting visual flow
    return items.sort((a, b) => b.aspectRatio - a.aspectRatio);
  }, [featuredArtists]);

  if (artworkItems.length === 0) {
    return (
      <section className="py-16 bg-primary">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
              Featured Artists
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-black/80 max-w-2xl mx-auto mt-4">
              The visionaries shaping our creative landscape.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-primary/90 backdrop-blur-sm relative">
      {/* Section background texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-l from-white/20 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <RevealOnScroll delay={0.1}>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
              Featured Artists
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-black/80 max-w-2xl mx-auto mt-4">
              The visionaries shaping our creative landscape.
            </p>
          </RevealOnScroll>
        </div>

        {/* Mobile-friendly artwork grid - one tile at a time on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {artworkItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group"
              onMouseEnter={() => setHoveredArtist(item.artistId)}
              onMouseLeave={() => setHoveredArtist(null)}
            >
              <Link href={`/artists/${item.artistId}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-black/10">
                  {/* Artwork Image */}
                  <div className="relative w-full" style={{ 
                    aspectRatio: item.aspectRatio > 1.5 ? '16/9' : 
                                 item.aspectRatio < 0.8 ? '4/5' : '1/1'
                  }}>
                    <Image
                      src={item.artwork.url}
                      alt={item.artwork.filename || `${item.artistName} artwork`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      loading={index < 8 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Artist info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex items-center gap-3">
                        {/* Artist avatar */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 overflow-hidden flex-shrink-0">
                          <Image
                            src={featuredArtists.find(a => a.id === item.artistId)?.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'}
                            alt={item.artistName}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Artist name and specialty */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold text-sm sm:text-base truncate">
                            {item.artistName}
                          </h3>
                          {featuredArtists.find(a => a.id === item.artistId)?.fields.Speciality && (
                            <p className="text-white/80 text-xs sm:text-sm truncate">
                              {featuredArtists.find(a => a.id === item.artistId)?.fields.Speciality}
                            </p>
                          )}
                        </div>
                        
                        {/* View profile button */}
                        <div className="flex-shrink-0">
                          <div 
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                            style={{ backgroundColor: item.themeColor }}
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Theme color accent */}
                    <div 
                      className="absolute top-4 left-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: item.themeColor }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all artists CTA */}
        <div className="text-center mt-12">
          <RevealOnScroll delay={0.8}>
            <Link href="/artists">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#17624A] text-white font-bold text-2xl px-12 py-6 rounded-full shadow-xl hover:brightness-110 transition-all border border-[#17624A]/30"
              >
                View All Artists
              </motion.button>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
} 