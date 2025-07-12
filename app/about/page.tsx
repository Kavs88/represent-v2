"use client";
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import SEOHead from '@/components/ui/SEOHead';
import LinkWithCursor from '@/components/ui/LinkWithCursor';

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AboutPage = memo(function AboutPage() {
  return (
    <>
      <SEOHead 
        title="About Represent+"
        description="Discover the story behind Represent+, the premier platform connecting exceptional creative talent with opportunities worldwide. Learn about our mission, values, and commitment to artistic excellence."
        keywords={['about us', 'artist representation', 'creative platform', 'artists', 'representation agency', 'creative talent']}
        url="/about"
      />
      
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
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
          
          <div className="relative z-10 max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 text-center">
            <RevealOnScroll delay={0}>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white mb-2 xs:mb-3 sm:mb-4">
                Our Story at <span className="font-bold" style={{ color: '#00FF9D' }}>Represent+</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-3 xs:px-4 sm:px-6">
                Where creative visionaries and bold opportunities meet. Represent+ is the platform for artists and agencies who believe in the power of originality, connection, and craft.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Wavy SVG Divider */}
        <div className="relative z-10 -mt-8 sm:-mt-12 lg:-mt-16">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 sm:h-16 lg:h-24">
            <path d="M0 0h1440v60c-120 40-360 60-720 60S120 100 0 60V0z" fill="#00FF9D" fillOpacity="0.08" />
          </svg>
        </div>

        {/* Mission Section with Animated Image */}
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
          <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Exhibition Image left */}
            <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-full flex items-center justify-center md:items-stretch md:justify-start">
              <img
                src="/exhibition.jpg"
                alt="Modern art exhibition"
                className="h-full max-h-[420px] w-auto rounded-3xl shadow-2xl object-cover object-center mb-6 md:mb-0"
                style={{ minHeight: '180px' }}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center md:items-center h-full">
              <motion.div 
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-center md:text-center mb-8 xs:mb-12 sm:mb-16 md:mb-0 flex flex-col justify-center h-full"
              >
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 xs:mb-4 sm:mb-6">
                  Our Mission
                </h2>
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-4 xs:p-6 sm:p-8 lg:p-12 border border-border/50 shadow-xl">
                  <p className="text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground mb-3 xs:mb-4 sm:mb-6">
                    We champion creative excellence. Our mission is to elevate artists, foster meaningful collaborations, and connect talent with those who value vision and authenticity.
                  </p>
                  <p className="text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
                    <span className="font-bold" style={{ color: '#00FF9D' }}>Represent+</span> is a curated ecosystem where artists, designers, and creative professionals thrive, inspire, and shape culture together.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 relative bg-black overflow-hidden">
          {/* Spotlight effect */}
          <div className="absolute inset-0 z-0">
            {/* Multiple spotlight beams */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-[#00ff9d]/50 via-[#00ff9d]/25 to-transparent rounded-full blur-3xl animate-pulse opacity-90"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-[#22c55e]/50 via-[#22c55e]/25 to-transparent rounded-full blur-3xl animate-pulse delay-1000 opacity-90"></div>
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-t from-[#00ff9d]/40 via-[#00ff9d]/20 to-transparent rounded-full blur-3xl animate-pulse delay-500 opacity-90"></div>
          </div>
          <div className="max-w-6xl mx-auto">
            <motion.div 
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Our Values
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                The principles that define our creative community
              </p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            >
              <motion.div 
                variants={fadeUp}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">Artistic Excellence</h3>
                <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                  We represent only the most original and innovative talent, setting a new standard for creative achievement.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeUp}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Authentic Partnerships</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  We build lasting, supportive relationships with our artists—offering guidance, advocacy, and a platform for growth.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeUp}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Global Impact</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  We connect creative visionaries with opportunities worldwide, amplifying voices and shaping culture across borders.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How to Connect Section */}
        <section className="py-20 px-4 bg-muted/10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Connect With <span className="font-bold" style={{ color: '#00FF9D' }}>Represent+</span>
              </h2>
              <p className="text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
                Whether you’re an artist, agency, or creative partner, we’re here to help you make your mark. Let’s start a conversation about your next chapter.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">For Artists</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Ready to take your creative career to the next level? We're always looking for 
                    exceptional talent to join our roster.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Submit your portfolio for review
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Connect with our team for consultation
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Explore collaboration opportunities
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">For Partners</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Looking for exceptional creative talent for your next project? 
                    We can connect you with the perfect artist.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Browse our curated artist roster
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Request custom artist recommendations
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Discuss partnership opportunities
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <LinkWithCursor 
                  href="/contact" 
                  className="inline-flex items-center gap-3 font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#17624A', color: '#fff' }}
                >
                  Get in Touch
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </LinkWithCursor>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
});

export default AboutPage; 