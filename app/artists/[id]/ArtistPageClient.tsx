"use client";

import Image from "next/image";
import { ArtworkCarousel } from "@/components/artists/ArtworkCarousel";
import PlatformContactButtons from "@/components/ui/PlatformContactButtons";
import ContactModal from "@/components/ui/ContactModal";
import ReviewCard from "@/components/artists/ReviewCard";
import { Artist, Review } from "@/types/artist";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ArtistPageClient({ artist, reviews }: { artist: Artist; reviews: Review[] }) {
  console.log(`ArtistPageClient: Received ${reviews.length} reviews for ${artist.fields.Name}`);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Set up the dynamic theme styles with fallbacks
  const themeStyles = {
    '--bg-color': artist.fields.ThemeBackgroundColor || '#0E0E0E',
    '--text-color': artist.fields.ThemeTextColor || '#E5E5E5',
    '--primary-color': artist.fields.ThemePrimaryColor || '#00ff9d',
    '--card-bg': artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : '#1a1a1a',
    '--border-color': artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : '#404040',
  } as React.CSSProperties;

  return (
    <main className="min-h-screen transition-colors duration-500" style={{
      ...themeStyles,
      backgroundColor: artist.fields.ThemeBackgroundColor || '#0E0E0E',
      color: artist.fields.ThemeTextColor || '#E5E5E5'
    }}>
      
      {/* Hero Banner Section */}
      {artist.fields.GeneratedBannerImage?.[0]?.url && (
        <div className="relative w-full h-64 xs:h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={artist.fields.GeneratedBannerImage[0].url}
            alt={`${artist.fields.Name} banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to top, ${artist.fields.ThemeBackgroundColor || '#0E0E0E'}, ${artist.fields.ThemeBackgroundColor || '#0E0E0E'}60, transparent)`
          }} />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to right, ${artist.fields.ThemeBackgroundColor || '#0E0E0E'}40, transparent, transparent)`
          }} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-6 xs:py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Profile Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-center gap-4 xs:gap-6 sm:gap-8 mb-8 xs:mb-12 sm:mb-16 relative -mt-12 xs:-mt-16 sm:-mt-20 lg:-mt-32"
            >
              {/* Artist Avatar */}
              <div className="relative w-24 h-24 xs:w-32 xs:h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 flex-shrink-0">
                <div 
                  className="absolute inset-0 rounded-full border-4 shadow-2xl"
                  style={{ borderColor: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                />
                <Image
                  src={artist.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'}
                  alt={artist.fields.Name}
                  fill
                  className="rounded-full object-cover p-3"
                />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-theme-primary rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Artist Info */}
              <div className="text-center lg:text-left flex-1">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-serif font-bold mb-2 xs:mb-3 sm:mb-4"
                  style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                >
                  {artist.fields.Name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-3 xs:mb-4 sm:mb-6"
                  style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}
                >
                  {artist.fields.Speciality}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-2 xs:gap-2 sm:gap-4 justify-center lg:justify-start mb-3 xs:mb-4 sm:mb-6"
                >
                  <span className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs font-medium" style={{
                    backgroundColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                    color: artist.fields.ThemePrimaryColor || '#00ff9d'
                  }}>
                    Available for Commissions
                  </span>
                  <span className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs font-medium" style={{
                    backgroundColor: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}10` : 'rgba(136, 136, 136, 0.2)',
                    color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888'
                  }}>
                    Professional Artist
                  </span>
                </motion.div>
                
                {/* Let's Talk Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full font-bold text-sm xs:text-base sm:text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg min-h-[44px] flex items-center justify-center"
                  style={{
                    backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                    color: '#000000'
                  }}
                >
                  Let's Talk
                </motion.button>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="max-w-4xl mx-auto space-y-6 xs:space-y-8 sm:space-y-12 mb-16 xs:mb-20 sm:mb-32"
            >
              {/* About Section */}
              <section className="backdrop-blur-sm rounded-2xl p-3 xs:p-4 sm:p-6 lg:p-8" style={{
                backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
              }}>
                                  <h2 className="text-xl xs:text-2xl sm:text-3xl font-serif font-bold mb-3 xs:mb-4 sm:mb-6" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>About the Artist</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-sm xs:text-base sm:text-lg leading-relaxed whitespace-pre-line" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}90` : '#E5E5E5' }}>
                      {artist.fields.Bio}
                    </p>
                  </div>
              </section>

                              {/* Artwork Gallery */}
                {artist.fields.Artwork && artist.fields.Artwork.length > 0 && (
                  <section className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8" style={{
                    backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                    border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                  }}>
                                      <div className="text-center mb-6 sm:mb-8">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>Portfolio</h2>
                      <p className="text-sm sm:text-base" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>Explore the artist's latest works</p>
                    </div>
                  <ArtworkCarousel artworks={artist.fields.Artwork} themeColor={artist.fields.ThemePrimaryColor} />
                </section>
              )}

              {/* Reviews Section */}
              {reviews.length > 0 && (
                <motion.section 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative overflow-hidden"
                >
                  {/* Background gradient */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-60"
                    style={{
                      background: `linear-gradient(135deg, ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}08` : 'rgba(0, 255, 157, 0.08)'} 0%, ${artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}15` : 'rgba(14, 14, 14, 0.15)'} 50%, ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}05` : 'rgba(0, 255, 157, 0.05)'} 100%)`
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border" style={{
                    borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                    boxShadow: `0 20px 60px ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}08` : 'rgba(0, 255, 157, 0.08)'}`
                  }}>
                    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
                        style={{
                          backgroundColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                          color: artist.fields.ThemePrimaryColor || '#00ff9d'
                        }}
                      >
                        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full" style={{ backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d' }} />
                        Client Testimonials
                      </motion.div>
                      
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-3 sm:mb-4"
                        style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                      >
                        Client Reviews
                      </motion.h2>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-sm sm:text-base lg:text-lg font-light tracking-wide px-2"
                        style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}
                      >
                        What clients say about working with {artist.fields.Name}
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
                    >
                      {reviews.map((review, index) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 0.7 + (index * 0.1),
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                        >
                          <ReviewCard
                            review={review}
                            themePrimaryColor={artist.fields.ThemePrimaryColor}
                            themeBackgroundColor={artist.fields.ThemeBackgroundColor}
                            themeTextColor={artist.fields.ThemeTextColor}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.section>
              )}

              {/* Contact Section */}
              <section className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 text-center" style={{
                backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
              }}>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                  Ready to Work Together?
                </h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 px-2" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}90` : '#E5E5E5' }}>
                  Let's discuss your project and bring your vision to life with {artist.fields.Name}'s unique artistic style.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full font-bold text-lg sm:text-xl transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                    color: '#000000'
                  }}
                >
                  Start Your Project
                </motion.button>
              </section>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        artistName={artist.fields.Name}
        themePrimaryColor={artist.fields.ThemePrimaryColor}
        themeBackgroundColor={artist.fields.ThemeBackgroundColor}
        themeTextColor={artist.fields.ThemeTextColor}
      />
    </main>
  );
} 