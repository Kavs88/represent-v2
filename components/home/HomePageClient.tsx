"use client";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { Artist } from "@/types/artist";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";
import ArtworkCarousel from "@/components/home/ArtworkCarousel";
import ArticlesSection from "@/components/home/ArticlesSection";
import { lazy, Suspense, memo } from 'react';

// Lazy load heavy components for better performance
const LazyArtworkCarousel = lazy(() => import("@/components/home/ArtworkCarousel"));
const LazyArticlesSection = lazy(() => import("@/components/home/ArticlesSection"));

// Loading fallback for lazy components
const ComponentLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse">
      <div className="h-4 bg-muted rounded w-32 mb-2"></div>
      <div className="h-4 bg-muted rounded w-24"></div>
    </div>
  </div>
);

// Memoized components for better performance
const MemoizedArtistCard = memo(ArtistCard);
const MemoizedArtworkCarousel = memo(LazyArtworkCarousel);

const HomePageClient = memo(({ featuredArtists, artworks }: { featuredArtists: Artist[]; artworks?: any[] }) => {
  // Debug logging
  console.log('HomePageClient render:', { 
    featuredArtistsCount: featuredArtists?.length || 0, 
    artworksCount: artworks?.length || 0 
  });
  
  return (
    <div className="bg-background text-foreground font-sans overflow-x-hidden">
      {/* === Immersive Hero Section === */}
      <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden py-12 px-4">
        {/* Enhanced background with texture */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] opacity-100"></div>
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary to-green-500 rounded-full blur-3xl animate-pulse opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-primary to-green-500 rounded-full blur-3xl animate-pulse delay-1000 opacity-30"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
            <AnimatedText text="DISCOVER" el="span" className="block text-white drop-shadow-lg" />
            <AnimatedText text="EXCEPTIONAL" el="span" className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400 drop-shadow-lg" delay={0.3} />
            <AnimatedText text="TALENT" el="span" className="block text-white drop-shadow-lg" delay={0.6} />
          </h1>
          <RevealOnScroll delay={1.2}>
            <p className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto mt-8 drop-shadow-md">
              Creative power meets real opportunity. <span className="text-green-400">Represent+</span> backs bold talent with the support, exposure, and strategy they deserve.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1.4}>
            <Link href="/artists" className="mt-12 inline-block">
              <MagneticButton className="bg-black">
                <span className="px-12 py-6 rounded-full font-bold text-2xl shadow-xl transition hover:brightness-110 bg-[#17624A] text-white inline-block border border-[#17624A]/30">
                  Meet our Creators
                </span>
              </MagneticButton>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* === Featured Work Carousel === */}
      {artworks && artworks.length > 0 ? (
        <section className="py-12 relative overflow-hidden">
          {/* Deep teal background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]"></div>
          
          {/* Teal depth layers */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-teal-600/20 via-teal-500/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-teal-700/20 via-teal-600/10 to-transparent"></div>
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-teal-600/15 via-teal-500/8 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-teal-600/15 via-teal-500/8 to-transparent"></div>
          </div>
          
          {/* Vibrant orange accents */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-b from-orange-500/35 via-orange-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-t from-orange-600/30 via-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-400/25 via-orange-300/15 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
          <div className="relative z-10 w-full">
            <div className="text-center mb-8">
              <RevealOnScroll delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
                  Featured Work
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto drop-shadow-md">
                  A curated selection of exceptional artwork from our featured artists.
                </p>
              </RevealOnScroll>
            </div>
            <Suspense fallback={<ComponentLoader />}>
              <MemoizedArtworkCarousel artworks={artworks} />
            </Suspense>
          </div>
        </section>
      ) : null}

      {/* === Featured Artists Section (Spotlight Style) === */}
      <section className="py-8 relative bg-black overflow-hidden">
        {/* Spotlight effect */}
        <div className="absolute inset-0 z-0">
          {/* Multiple spotlight beams */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-[#00ff9d]/50 via-[#00ff9d]/25 to-transparent rounded-full blur-3xl animate-pulse opacity-90"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-[#22c55e]/50 via-[#22c55e]/25 to-transparent rounded-full blur-3xl animate-pulse delay-1000 opacity-90"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-t from-[#00ff9d]/40 via-[#00ff9d]/20 to-transparent rounded-full blur-3xl animate-pulse delay-500 opacity-90"></div>
        </div>
        
        <div className="relative z-20 container mx-auto px-4 w-full max-w-7xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white drop-shadow-lg tracking-tight">Featured Artists</h2>
            <p className="text-sm sm:text-base text-white/70 mt-2 max-w-2xl mx-auto">The visionaries shaping our creative landscape</p>
          </div>
          
          {featuredArtists && featuredArtists.length > 0 ? (
            <>
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent -mx-4 px-4">
                <div className={`flex gap-4 justify-center min-w-max ${featuredArtists.length <= 3 ? 'mx-auto' : ''}`}>
                  {featuredArtists.map((artist) => (
                    <div key={artist.id} className="relative w-72 flex-shrink-0 group">
                      <MemoizedArtistCard artist={artist} themeColor={artist.fields.ThemePrimaryColor} />
                      <Link href={`/artists/${artist.id}`}>
                        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 text-white font-bold text-lg rounded-xl z-10 backdrop-blur-sm">
                          View Profile
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
                {featuredArtists.length > 3 && (
                  <div className="mt-3 text-xs text-white/50 text-center select-none">Scroll to see more</div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-white/60 text-lg mb-4">Loading featured artists...</div>
              <div className="flex gap-4 justify-center">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-72 h-72 bg-white/5 rounded-xl animate-pulse border border-white/10"></div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Spotlight SVG Divider */}
        <div className="w-full overflow-hidden -mb-1">
          <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-6">
            <path d="M0 0h1440v12c-480 20-960 20-1440 0V0z" fill="url(#spotlight-gradient)" />
            <defs>
              <linearGradient id="spotlight-gradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
                <stop stopColor="#000000" />
                <stop offset="1" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* === Articles Section (Deep Teal Orange) === */}
      <section className="relative overflow-hidden">
        {/* Deep teal background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]"></div>
        
        {/* Teal depth layers */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-teal-600/20 via-teal-500/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-teal-700/20 via-teal-600/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-teal-600/15 via-teal-500/8 to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-teal-600/15 via-teal-500/8 to-transparent"></div>
        </div>
        
        {/* Vibrant orange accents */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-56 h-56 bg-gradient-to-b from-orange-500/30 via-orange-400/18 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-gradient-to-t from-orange-600/25 via-orange-500/15 to-transparent rounded-full blur-3xl animate-pulse delay-1500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-orange-400/20 via-orange-300/12 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 w-full">
          <Suspense fallback={
            <div className="py-24">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-black mb-12 text-center text-white drop-shadow-lg">Articles & Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl border border-orange-500/20 animate-pulse">
                      <div className="aspect-video bg-orange-500/10 rounded-t-xl"></div>
                      <div className="p-6">
                        <div className="h-4 bg-orange-400/20 rounded w-20 mb-3"></div>
                        <div className="h-6 bg-white/20 rounded w-full mb-2"></div>
                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }>
            <LazyArticlesSection />
          </Suspense>
        </div>
      </section>
    </div>
  );
});

HomePageClient.displayName = 'HomePageClient';

export default HomePageClient; 