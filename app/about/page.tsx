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
        <section className="relative h-[500px] sm:h-[600px] flex items-center justify-center text-center overflow-hidden py-8 sm:py-12 px-4">
          {/* Enhanced background with texture */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] opacity-100"></div>
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary to-green-500 rounded-full blur-3xl animate-pulse opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-primary to-green-500 rounded-full blur-3xl animate-pulse delay-1000 opacity-30"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <RevealOnScroll delay={0}>
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-10xl xl:text-12xl font-bold tracking-tight text-white mb-4 sm:mb-6 md:mb-8">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400 drop-shadow-lg">Represent+</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-4 sm:mb-6 md:mb-8">
                We're Not Your Typical Agency
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                The old model is broken. Agencies control, they don't collaborate. We're building something different—a partnership that amplifies your vision, not ours.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Wavy SVG Divider */}
        <div className="relative z-10 -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-12 md:h-16 lg:h-24">
            <path d="M0 0h1440v60c-120 40-360 60-720 60S120 100 0 60V0z" fill="#00FF9D" fillOpacity="0.08" />
          </svg>
        </div>

        {/* Mission Section with Animated Image */}
        <section className="py-8 sm:py-12 relative overflow-hidden" style={{ backgroundColor: '#2C2C2C' }}>
          {/* Boltgun grey background with subtle texture */}
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 md:h-[420px]">
            {/* Exhibition Image left */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex items-center justify-center h-full">
              <img
                src="/exhibition.jpg"
                alt="Modern art exhibition"
                className="h-full max-h-[300px] sm:max-h-[420px] w-auto rounded-3xl shadow-2xl object-cover object-center"
                style={{ minHeight: '180px' }}
              />
            </div>
            {/* Text Content - Centered and restyled */}
            <div className="flex-1 flex flex-col justify-center items-center h-full">
              <motion.div 
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-col justify-center items-center h-full w-full max-w-2xl mx-auto text-center"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 text-center leading-tight">
                  Our Mission
                </h2>
                <div className="bg-card/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 border border-border/50 shadow-2xl w-full max-w-xl mx-auto">
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 font-medium">
                      We exist for the bold. <span className="text-primary font-bold">Represent+</span> is where uncompromising creatives find real opportunity.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/80">
                      We're here to amplify visionaries, not just manage them. This is a platform built for artists who want to shape culture.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 font-medium">
                      <span className="text-primary font-bold">Represent+</span> is a curated ecosystem where artists thrive and set new standards—together.
                    </p>
                  </div>
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
                The principles that drive our creative community
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
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">Creative Independence</h3>
                <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                  We don’t do cookie-cutter. Every artist we represent is handpicked for originality, edge, and a relentless drive to push boundaries.
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
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Strategic Partnership</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  We’re in your corner. Our relationships are built on trust, advocacy, and a shared ambition to break new ground—together.
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
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Cultural Impact</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  We connect creative visionaries with global opportunities, amplifying voices that move the culture forward.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Wavy SVG Divider */}
        <div className="relative z-10 -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-12 md:h-16 lg:h-24">
            <path d="M0 0h1440v60c-120 40-360 60-720 60S120 100 0 60V0z" fill="#00FF9D" fillOpacity="0.08" />
          </svg>
        </div>

        {/* How to Connect Section */}
        <section className="py-20 px-4 relative bg-black overflow-hidden">
          {/* Spotlight effect */}
          <div className="absolute inset-0 z-0">
            {/* Multiple spotlight beams */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-[#00ff9d]/50 via-[#00ff9d]/25 to-transparent rounded-full blur-3xl animate-pulse opacity-90"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-[#22c55e]/50 via-[#22c55e]/25 to-transparent rounded-full blur-3xl animate-pulse delay-1000 opacity-90"></div>
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-t from-[#00ff9d]/40 via-[#00ff9d]/20 to-transparent rounded-full blur-3xl animate-pulse delay-500 opacity-90"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
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
                Whether you’re an artist ready to level up, or a partner looking for the next wave of creative talent, Represent+ is your launchpad. Let’s build something that matters.
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
                  <p className="text-white/90 mb-6 leading-relaxed font-medium">
                    Ready to make your mark? Submit your portfolio—no fluff, just your best work. Book a call with our team. Explore collaborations that actually move the needle.
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                      Submit your portfolio for review
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                      Connect with our team for consultation
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
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
                  <p className="text-white/90 mb-6 leading-relaxed font-medium">
                    Looking for exceptional creative talent for your next project? We’ll connect you with the perfect artist. Browse our roster, request custom recommendations, or start a conversation about partnership.
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                      Browse our curated artist roster
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                      Request custom artist recommendations
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                      Discuss partnership opportunities
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <LinkWithCursor 
                  href="/contact" 
                  className="inline-flex items-center gap-3 font-bold text-2xl px-12 py-6 rounded-full bg-[#17624A] text-white shadow-xl hover:brightness-110 transition-all border border-[#17624A]/30"
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