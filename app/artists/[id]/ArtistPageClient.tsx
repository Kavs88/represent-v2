"use client";

import Image from "next/image";
import dynamic from 'next/dynamic';
import ReviewCard from "@/components/artists/ReviewCard";
import { Artist, Review } from "@/types/artist";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import PlatformContactButtons from "@/components/ui/PlatformContactButtons";

const ArtworkCarousel = dynamic(() => import('@/components/artists/ArtworkCarousel').then(mod => mod.ArtworkCarousel), { ssr: false });
const ContactModal = dynamic(() => import('@/components/ui/ContactModal'), { ssr: false });

export default function ArtistPageClient({ artist, reviews }: { artist: Artist; reviews: Review[] }) {
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
    <>
      <main className="min-h-screen transition-colors duration-500" style={{
        ...themeStyles,
        backgroundColor: artist.fields.ThemeBackgroundColor || '#0E0E0E',
        color: artist.fields.ThemeTextColor || '#E5E5E5'
      }}>
        {/* Hero Banner Section - Bigger */}
        {artist.fields.GeneratedBannerImage?.[0]?.url && (
          <div className="relative w-full h-80 xs:h-96 md:h-[600px] lg:h-[700px] overflow-hidden">
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
                className="flex flex-row items-center justify-center gap-8 xs:gap-10 sm:gap-12 mb-12 xs:mb-16 sm:mb-20"
                style={{ flexWrap: 'nowrap' }}
              >
                {/* Artist Avatar - Even Bigger, Always Side by Side */}
                <div className="relative w-56 h-56 xs:w-72 xs:h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] flex-shrink-0">
                  <div 
                    className="absolute inset-0 rounded-full border-8 shadow-2xl"
                    style={{ borderColor: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                  />
                  <Image
                    src={artist.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'}
                    alt={artist.fields.Name}
                    fill
                    className="rounded-full object-cover p-6"
                    sizes="(max-width: 640px) 288px, (max-width: 768px) 384px, (max-width: 1024px) 512px, 512px"
                  />
                  <div className="absolute -bottom-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-theme-primary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {/* Artist Info - Vertically Centered, Always Next to Image */}
                <div className="flex-1 max-w-full flex flex-col justify-center lg:pl-8 text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col gap-1 mb-2 xs:mb-3 sm:mb-4"
                  >
                    <h1
                      className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-extrabold break-words overflow-hidden leading-tight drop-shadow-lg"
                      style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d', textShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
                    >
                      {artist.fields.Name}
                    </h1>
                  </motion.div>
                  {/* Visual Accent/Divider */}
                  <div className="w-24 h-2 rounded-full mb-4 xs:mb-5 sm:mb-6" style={{ background: artist.fields.ThemePrimaryColor || '#00ff9d', opacity: 0.7 }} />
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4 xs:mb-5 sm:mb-6 break-words overflow-hidden font-semibold flex items-center gap-3"
                    style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}cc` : '#bbbbbb' }}
                  >
                    {artist.fields.Speciality}
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap gap-3 xs:gap-4 sm:gap-5 mb-5 xs:mb-6 sm:mb-8"
                  >
                    <span className="px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-full text-lg xs:text-xl sm:text-2xl font-semibold break-words" style={{
                      backgroundColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                      color: artist.fields.ThemePrimaryColor || '#00ff9d'
                    }}>
                      Available for Commissions
                    </span>
                    <span className="px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-full text-lg xs:text-xl sm:text-2xl font-semibold break-words" style={{
                      backgroundColor: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}10` : 'rgba(136, 136, 136, 0.2)',
                      color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888'
                    }}>
                      Professional Artist
                    </span>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    onClick={() => setIsContactModalOpen(true)}
                    className="px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-full font-bold text-base xs:text-lg sm:text-xl transition-all duration-200 hover:scale-105 hover:shadow-lg min-h-[48px] flex items-center justify-center w-fit"
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
                className="max-w-5xl mx-auto space-y-8 xs:space-y-10 sm:space-y-12 mb-16 xs:mb-20 sm:mb-32"
              >
                {/* About Section - Text within boundaries */}
                <section className="backdrop-blur-sm rounded-2xl p-4 xs:p-6 sm:p-8 lg:p-10" style={{
                  backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                  border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                }}>
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold mb-4 xs:mb-5 sm:mb-6 break-words" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>About the Artist</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div className="text-xl xs:text-2xl sm:text-3xl leading-relaxed break-words overflow-hidden">
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <p style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}90` : '#E5E5E5', marginBottom: '1.5rem', lineHeight: '1.6' }} {...props} />, 
                          strong: ({node, ...props}) => <strong style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }} {...props} />
                        }}
                      >
                        {artist.fields.Bio ? artist.fields.Bio.replace(/\n\n/g, '\n\n') : ''}
                      </ReactMarkdown>
                    </div>
                  </div>
                </section>
                {/* Artwork Gallery */}
                {artist.fields.Artwork && artist.fields.Artwork.length > 0 && (
                  <section className="backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10" style={{
                    backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                    border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                  }}>
                    <div className="text-center mb-8 sm:mb-10">
                      <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-3 break-words" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>Portfolio</h2>
                      <p className="text-base sm:text-lg break-words" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>Explore the artist's latest works</p>
                    </div>
                    <ArtworkCarousel artworks={artist.fields.Artwork} themeColor={artist.fields.ThemePrimaryColor} />
                  </section>
                )}
                {/* Products & Services Section */}
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
                        Available Services
                      </motion.div>
                      
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-3 sm:mb-4"
                        style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                      >
                        Products & Services
                      </motion.h2>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-sm sm:text-base lg:text-lg font-light tracking-wide px-2"
                        style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}
                      >
                        Explore {artist.fields.Name}'s available products and services
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                    >
                      {/* Custom Commissions */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border hover:transform hover:scale-105 transition-all duration-300"
                        style={{
                          borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(0, 255, 157, 0.3)'
                        }}
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                              Custom Commissions
                            </h3>
                            <span className="text-sm sm:text-base font-bold" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                              From $200
                            </span>
                          </div>
                          <p className="text-sm sm:text-base mb-4" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>
                            Personalized artwork created specifically for your vision and requirements.
                          </p>
                          <button 
                            onClick={() => setIsContactModalOpen(true)}
                            className="w-full py-2 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors"
                            style={{
                              backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                              color: '#000000'
                            }}
                          >
                            Discuss Project
                          </button>
                        </div>
                      </motion.div>

                      {/* Original Artworks */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border hover:transform hover:scale-105 transition-all duration-300"
                        style={{
                          borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(0, 255, 157, 0.3)'
                        }}
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                              Original Artworks
                            </h3>
                            <span className="text-sm sm:text-base font-bold" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                              From $150
                            </span>
                          </div>
                          <p className="text-sm sm:text-base mb-4" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>
                            One-of-a-kind pieces available for purchase from the artist's collection.
                          </p>
                          <button 
                            onClick={() => setIsContactModalOpen(true)}
                            className="w-full py-2 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors"
                            style={{
                              backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                              color: '#000000'
                            }}
                          >
                            View Available
                          </button>
                        </div>
                      </motion.div>

                      {/* Prints & Reproductions */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border hover:transform hover:scale-105 transition-all duration-300"
                        style={{
                          borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(0, 255, 157, 0.3)'
                        }}
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                              Prints & Reproductions
                            </h3>
                            <span className="text-sm sm:text-base font-bold" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                              From $50
                            </span>
                          </div>
                          <p className="text-sm sm:text-base mb-4" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>
                            High-quality prints and reproductions of the artist's most popular works.
                          </p>
                          <button 
                            onClick={() => setIsContactModalOpen(true)}
                            className="w-full py-2 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors"
                            style={{
                              backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                              color: '#000000'
                            }}
                          >
                            Browse Prints
                          </button>
                        </div>
                      </motion.div>

                      {/* Art Classes */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border hover:transform hover:scale-105 transition-all duration-300"
                        style={{
                          borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(0, 255, 157, 0.3)'
                        }}
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                              Art Classes
                            </h3>
                            <span className="text-sm sm:text-base font-bold" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                              From $75
                            </span>
                          </div>
                          <p className="text-sm sm:text-base mb-4" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>
                            Learn from {artist.fields.Name} through private or group art classes.
                          </p>
                          <button 
                            onClick={() => setIsContactModalOpen(true)}
                            className="w-full py-2 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors"
                            style={{
                              backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                              color: '#000000'
                            }}
                          >
                            Book Class
                          </button>
                        </div>
                      </motion.div>

                      {/* Digital Art */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border hover:transform hover:scale-105 transition-all duration-300"
                        style={{
                          borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(0, 255, 157, 0.3)'
                        }}
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                              Digital Art
                            </h3>
                            <span className="text-sm sm:text-base font-bold" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                              From $100
                            </span>
                          </div>
                          <p className="text-sm sm:text-base mb-4" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>
                            Custom digital artwork for branding, social media, or personal use.
                          </p>
                          <button 
                            onClick={() => setIsContactModalOpen(true)}
                            className="w-full py-2 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors"
                            style={{
                              backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                              color: '#000000'
                            }}
                          >
                            Get Quote
                          </button>
                        </div>
                      </motion.div>

                      {/* Art Consultation */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border hover:transform hover:scale-105 transition-all duration-300"
                        style={{
                          borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(0, 255, 157, 0.3)'
                        }}
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                              Art Consultation
                            </h3>
                            <span className="text-sm sm:text-base font-bold" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                              From $150
                            </span>
                          </div>
                          <p className="text-sm sm:text-base mb-4" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>
                            Professional advice on art selection, curation, and collection building.
                          </p>
                          <button 
                            onClick={() => setIsContactModalOpen(true)}
                            className="w-full py-2 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors"
                            style={{
                              backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                              color: '#000000'
                            }}
                          >
                            Schedule Call
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>

                    <div className="text-center mt-8 sm:mt-12">
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        className="text-sm sm:text-base mb-4 px-2"
                        style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}
                      >
                        All prices are estimates. Final pricing depends on size, complexity, and materials.
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsContactModalOpen(true)}
                        className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-200 hover:shadow-lg"
                        style={{
                          backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                          color: '#000000'
                        }}
                      >
                        Get Custom Quote
                      </motion.button>
                    </div>
                  </div>
                </motion.section>

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
      </main>
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        artistName={artist.fields.Name}
        themePrimaryColor={artist.fields.ThemePrimaryColor}
        themeBackgroundColor={artist.fields.ThemeBackgroundColor}
        themeTextColor={artist.fields.ThemeTextColor}
      />
    </>
  );
} 