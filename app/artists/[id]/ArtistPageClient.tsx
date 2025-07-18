"use client";

import Image from "next/image";
import dynamic from 'next/dynamic';
import ReviewCard from "@/components/artists/ReviewCard";
import { Artist, Review } from "@/types/artist";
import { Service } from "@/lib/airtable";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import PlatformContactButtons from "@/components/ui/PlatformContactButtons";

const ArtworkCarousel = dynamic(() => import('@/components/artists/ArtworkCarousel').then(mod => mod.ArtworkCarousel), { ssr: false });
const ContactModal = dynamic(() => import('@/components/ui/ContactModal'), { ssr: false });

export default function ArtistPageClient({ artist, reviews, services }: { artist: Artist; reviews: Review[]; services: Service[] }) {
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
        {/* Hero Banner Section - Mobile Optimized */}
        {artist.fields.GeneratedBannerImage?.[0]?.url && (
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] overflow-hidden">
            <Image
              src={artist.fields.GeneratedBannerImage[0].url}
              alt={`${artist.fields.Name} banner`}
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="/placeholder-blur.png"
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <div className="max-w-6xl mx-auto">
              {/* Profile Header - Mobile First Stack Layout */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16"
              >
                {/* Artist Avatar - Mobile Optimized Sizing */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 flex-shrink-0">
                  <div 
                    className="absolute inset-0 rounded-full border-4 sm:border-6 lg:border-8 shadow-xl"
                    style={{ borderColor: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                  />
                  <Image
                    src={artist.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'}
                    alt={artist.fields.Name}
                    fill
                    className="rounded-full object-cover p-3 sm:p-4 lg:p-6"
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, (max-width: 1280px) 256px, 320px"
                    priority
                    placeholder="blur"
                    blurDataURL="/placeholder-blur.png"
                  />
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 lg:-bottom-4 lg:-right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-theme-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {/* Artist Info - Mobile Optimized Text */}
                <div className="flex-1 max-w-full flex flex-col justify-center text-center lg:text-left lg:pl-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col gap-1 mb-2 sm:mb-3 lg:mb-4"
                  >
                    <h1
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-extrabold break-words overflow-hidden leading-tight drop-shadow-lg"
                      style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d', textShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
                    >
                      {artist.fields.Name}
                    </h1>
                  </motion.div>
                  
                  {/* Visual Accent/Divider */}
                  <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 lg:h-2 rounded-full mb-3 sm:mb-4 lg:mb-6 mx-auto lg:mx-0" style={{ background: artist.fields.ThemePrimaryColor || '#00ff9d', opacity: 0.7 }} />
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 sm:mb-4 lg:mb-6 break-words overflow-hidden font-semibold flex items-center justify-center lg:justify-start gap-2 sm:gap-3"
                    style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}cc` : '#bbbbbb' }}
                  >
                    {artist.fields.Speciality}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 lg:mb-6 justify-center lg:justify-start"
                  >
                    <span className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-semibold break-words" style={{
                      backgroundColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                      color: artist.fields.ThemePrimaryColor || '#00ff9d'
                    }}>
                      Available for Commissions
                    </span>
                    <span className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-semibold break-words" style={{
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
                    className="px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-3.5 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg min-h-[44px] sm:min-h-[48px] flex items-center justify-center w-fit mx-auto lg:mx-0"
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
                className="max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12 mb-12 sm:mb-16 lg:mb-24"
              >
                {/* About Section - Mobile Optimized */}
                <section className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8" style={{
                  backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                  border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                }}>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-3 sm:mb-4 lg:mb-6 break-words" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>About the Artist</h2>
                  <div className="prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none">
                    <div className="text-base sm:text-lg lg:text-xl leading-relaxed break-words overflow-hidden">
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <p style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}90` : '#E5E5E5', marginBottom: '1rem', lineHeight: '1.6' }} {...props} />, 
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
                  <section className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8" style={{
                    backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                    border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                  }}>
                    <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-2 sm:mb-3 break-words" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>Portfolio</h2>
                      <p className="text-sm sm:text-base lg:text-lg break-words" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>Explore the artist's latest works</p>
                    </div>
                    <ArtworkCarousel artworks={artist.fields.Artwork} themeColor={artist.fields.ThemePrimaryColor} />
                  </section>
                )}
                
                {/* Products & Services Section - Mobile Optimized */}
                <motion.section 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative overflow-hidden"
                >
                  {/* Background gradient */}
                  <div 
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-60"
                    style={{
                      background: `linear-gradient(135deg, ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}08` : 'rgba(0, 255, 157, 0.08)'} 0%, ${artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}15` : 'rgba(14, 14, 14, 0.15)'} 50%, ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}05` : 'rgba(0, 255, 157, 0.05)'} 100%)`
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border" style={{
                    borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                    boxShadow: `0 20px 60px ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}08` : 'rgba(0, 255, 157, 0.08)'}`
                  }}>
                    <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4"
                        style={{
                          backgroundColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                          color: artist.fields.ThemePrimaryColor || '#00ff9d'
                        }}
                      >
                        <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full" style={{ backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d' }} />
                        Available Services
                      </motion.div>
                      
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-2 sm:mb-3 lg:mb-4"
                        style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                      >
                        Products & Services
                      </motion.h2>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-xs sm:text-sm lg:text-base font-light tracking-wide px-2"
                        style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}
                      >
                        Explore {artist.fields.Name}'s available products and services
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
                    >
                      {services && services.length > 0 ? (
                        services.map((service, idx) => (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                            className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col"
                            style={{
                              borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(0, 255, 157, 0.3)'
                            }}
                          >
                            {service.fields["Image URL"] && (
                              <div className="relative w-full h-32 sm:h-36 lg:h-40 bg-black/10">
                                <Image
                                  src={service.fields["Image URL"]}
                                  alt={service.fields.Name}
                                  fill
                                  className="object-cover rounded-t-xl"
                                />
                              </div>
                            )}
                            <div className="p-4 sm:p-6 flex-1 flex flex-col gap-2">
                              <h3 className="text-base sm:text-lg font-bold text-foreground mb-1" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>{service.fields.Name}</h3>
                              {service.fields.Description && (
                                <p className="text-xs sm:text-sm text-muted-foreground mb-2">{service.fields.Description}</p>
                              )}
                              <div className="mt-auto flex flex-col gap-2">
                                {service.fields["Price Range"] && (
                                  <span className="text-sm font-semibold" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                                    {service.fields["Price Range"]}
                                  </span>
                                )}
                                {service.fields.Category && (
                                  <span className="text-xs font-medium text-muted-foreground bg-muted/30 rounded px-2 py-1 w-fit">
                                    {service.fields.Category}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-6 sm:py-8 text-muted text-sm sm:text-base lg:text-lg">
                          No services are currently listed for this artist.
                        </div>
                      )}
                    </motion.div>

                    <div className="text-center mt-6 sm:mt-8 lg:mt-10">
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        className="text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 px-2"
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
                        className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 hover:shadow-lg"
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

                {/* Reviews Section - Mobile Optimized */}
                {reviews.length > 0 && (
                  <motion.section 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative overflow-hidden"
                  >
                    {/* Background gradient */}
                    <div 
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-60"
                      style={{
                        background: `linear-gradient(135deg, ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}08` : 'rgba(0, 255, 157, 0.08)'} 0%, ${artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}15` : 'rgba(14, 14, 14, 0.15)'} 50%, ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}05` : 'rgba(0, 255, 157, 0.05)'} 100%)`
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border" style={{
                      borderColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                      boxShadow: `0 20px 60px ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}08` : 'rgba(0, 255, 157, 0.08)'}`
                    }}>
                      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="inline-flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4"
                          style={{
                            backgroundColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                            color: artist.fields.ThemePrimaryColor || '#00ff9d'
                          }}
                        >
                          <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full" style={{ backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d' }} />
                          Client Testimonials
                        </motion.div>
                        
                        <motion.h2 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-2 sm:mb-3 lg:mb-4"
                          style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                        >
                          Client Reviews
                        </motion.h2>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className="text-xs sm:text-sm lg:text-base font-light tracking-wide px-2"
                          style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}
                        >
                          What clients say about working with {artist.fields.Name}
                        </motion.p>
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
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

                {/* Contact Section - Mobile Optimized */}
                <section className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center" style={{
                  backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                  border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                }}>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-2 sm:mb-3 lg:mb-4" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                    Ready to Work Together?
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 px-2" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}90` : '#E5E5E5' }}>
                    Let's discuss your project and bring your vision to life with {artist.fields.Name}'s unique artistic style.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsContactModalOpen(true)}
                    className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 hover:shadow-lg"
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