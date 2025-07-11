"use client";
import React, { memo, useEffect } from "react";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { Artist } from "@/types/artist";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DynamicArtworkCarousel, DynamicArticlesSection, preloadComponent } from "@/components/ui/DynamicImports";
import EnhancedHero from "./EnhancedHero";

// Memoized components for better performance
const MemoizedArtistCard = memo(ArtistCard);

interface HomePageClientProps {
  featuredArtists: Artist[];
  artworks?: any[];
}

const HomePageClient = memo(({ featuredArtists, artworks }: HomePageClientProps) => {
  // Preload critical components on mount
  useEffect(() => {
    // Preload components that will be needed
    preloadComponent('ArtworkCarousel');
    preloadComponent('ArticlesSection');
  }, []);

  return (
    <div className="bg-background text-foreground font-sans overflow-x-hidden">
      {/* === Enhanced Immersive Hero Section === */}
      <EnhancedHero />

      {/* === Featured Work Carousel === */}
      {artworks && artworks.length > 0 && (
        <section className="py-24" style={{ background: '#23272a' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-serif font-bold text-white">Featured Work</h2>
               <p className="text-white/70 mt-2">A glimpse into the extraordinary.</p>
            </div>
            <DynamicArtworkCarousel artworks={artworks} />
          </div>
        </section>
      )}

      {/* === Featured Artists Section (Premium Carousel) === */}
      <section className="py-16 bg-gradient-to-b from-[#18181b] to-[#101014]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black mb-8 text-center text-white">Featured Artists</h2>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent -mx-4 px-4">
            <div className="flex gap-8 md:gap-10">
              {featuredArtists.map((artist) => (
                <div key={artist.id} className="relative min-w-[320px] max-w-xs flex-shrink-0 group">
                  <MemoizedArtistCard artist={artist} themeColor={artist.fields.ThemePrimaryColor} />
                  <Link href={`/artists/${artist.id}`}>
                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 text-white font-bold text-lg rounded-2xl z-10">
                      View Profile
                    </button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-white/40 text-center select-none">Scroll to see more</div>
          </div>
        </div>
        {/* SVG Divider */}
        <div className="w-full overflow-hidden -mb-1">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
            <path d="M0 0h1440v30c-480 40-960 40-1440 0V0z" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
                <stop stopColor="#18181b" />
                <stop offset="1" stopColor="#101014" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* === Articles Section (Bottom, Metallic Grey) === */}
      <section style={{ background: '#23272a' }}>
        <DynamicArticlesSection />
      </section>
    </div>
  );
});

HomePageClient.displayName = 'HomePageClient';

export default HomePageClient; 