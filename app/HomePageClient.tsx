'use client';
import React from 'react';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Image from 'next/image';
import LinkWithCursor from '@/components/ui/LinkWithCursor';
import { ArtistCard } from '@/components/artists/ArtistCard';
import ArtworkCarousel from '@/components/home/ArtworkCarousel';
import ContactSection from '@/components/home/ContactSection';
import { Artist } from '@/types/artist';
import { Attachment } from '@/types/artist';
import ArtistTicker from '@/components/home/ArtistTicker';
import { Container, responsiveClasses } from '@/components/ui/Container';

interface HomePageClientProps {
  featuredArtists: Artist[];
  artworks: Attachment[];
}

export default function HomePageClient({ featuredArtists, artworks }: HomePageClientProps) {

  // Testimonials (static for now)
  const testimonials = [
    {
      quote: 'Represent+ connected me with the perfect gallery. The process was seamless and inspiring.',
      name: 'Sophie T.',
      role: 'Visual Artist',
    },
    {
      quote: 'I found my dream collaborator through this platform. The exposure is next-level.',
      name: 'Liam R.',
      role: 'Designer',
    },
    {
      quote: 'The featured section is a game-changer for emerging talent.',
      name: 'Ava M.',
      role: 'Curator',
    },
  ];

  return (
    <div className="bg-[#0e0e0e] text-white font-sans overflow-x-hidden">
      {/* === Immersive Hero Section === */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden py-12 xs:py-16 sm:py-24 lg:py-32 px-3 xs:px-4 sm:px-6">
        {/* Animated background gradient shapes */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 xs:w-48 sm:w-64 lg:w-96 h-32 xs:h-48 sm:h-64 lg:h-96 bg-gradient-to-r from-primary to-green-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-32 xs:w-48 sm:w-64 lg:w-96 h-32 xs:h-48 sm:h-64 lg:h-96 bg-gradient-to-l from-primary to-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <RevealOnScroll delay={0}>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none mb-3 xs:mb-4 sm:mb-6">
              <AnimatedText text="DISCOVER" className="block text-white" />
              <AnimatedText text="EXCEPTIONAL" className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400" delay={0.3} highlightIndex={9} />
              <AnimatedText text="TALENT" className="block text-white" delay={0.6} />
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mt-3 xs:mt-4 sm:mt-6 px-3 xs:px-4 sm:px-6">
              A curated platform showcasing the most innovative contemporary artists from around the world.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1.4}>
            <LinkWithCursor href="/artists" className="mt-4 xs:mt-6 sm:mt-8 inline-block">
              <MagneticButton className="bg-primary text-black font-bold text-sm xs:text-base sm:text-lg px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full shadow-lg transition-transform transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px] flex items-center justify-center">
                Explore the Roster
              </MagneticButton>
            </LinkWithCursor>
          </RevealOnScroll>
        </div>
      </section>

      {/* === Featured Work Carousel === */}
      {artworks.length > 0 && (
        <section className="py-6 xs:py-8 sm:py-12 lg:py-16 bg-card border-y border-border">
          <div className="text-center mb-4 xs:mb-6 sm:mb-8">
            <RevealOnScroll delay={0.1}>
              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">Featured Work</h2>
            </RevealOnScroll>
          </div>
          <ArtworkCarousel artworks={artworks} />
        </section>
      )}

      {/* === Featured Artists Section (High-Contrast Theme) === */}
      <section className="py-6 xs:py-8 sm:py-12 lg:py-16 bg-primary">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="text-center mb-4 xs:mb-6 sm:mb-8">
            <RevealOnScroll delay={0.1}>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">Featured Artists</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-black/80 max-w-2xl mx-auto mt-2 xs:mt-3 sm:mt-4">
                The visionaries shaping our creative landscape.
              </p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
            {featuredArtists.map((artist) => (
              <div key={artist.id} className="w-full flex justify-center">
                <ArtistCard artist={artist} themeColor={artist.fields.ThemePrimaryColor} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Call to Action Section === */}
      <section className="py-8 xs:py-12 sm:py-16 lg:py-20 bg-background text-center">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6">
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 xs:mb-4 sm:mb-6">Ready to connect with exceptional talent?</h2>
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground mb-4 xs:mb-6 sm:mb-8 max-w-2xl mx-auto px-3 xs:px-4">
            Browse our full roster or reach out to Represent+ for bespoke artist recommendations and collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center">
            <LinkWithCursor href="/artists">
              <MagneticButton className="bg-primary text-black font-bold text-sm xs:text-base sm:text-lg px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full shadow-lg transition-transform transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px] flex items-center justify-center">
                View All Artists
              </MagneticButton>
            </LinkWithCursor>
            <LinkWithCursor href="/contact">
              <MagneticButton className="bg-black text-primary border border-primary font-bold text-sm xs:text-base sm:text-lg px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full shadow-lg transition-transform transition-all duration-300 hover:bg-primary hover:text-black focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px] flex items-center justify-center">
                Contact the Agency
              </MagneticButton>
            </LinkWithCursor>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
} 