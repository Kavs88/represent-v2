import React from "react";
import PlatformContactButtons from "../../components/ui/PlatformContactButtons";

export default function ContactPage() {
  return (
    <div className="min-h-screen relative">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(0,255,157,0.2) 60px, rgba(0,255,157,0.2) 62px),
            repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(0,255,157,0.2) 60px, rgba(0,255,157,0.2) 62px)
          `,
          backgroundSize: '120px 120px, 120px 120px'
        }} />
      </div>
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="pt-16 xs:pt-20 sm:pt-24 lg:pt-32 xl:pt-40 pb-8 xs:pb-12 sm:pb-16 px-3 xs:px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 xs:mb-4 sm:mb-6 text-white">
            Let's Create Something Amazing
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground mb-6 xs:mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-3 xs:px-4 sm:px-6">
            Ready to bring your vision to life? Whether you're an artist looking to showcase your work 
            or a client seeking exceptional talent, we're here to make it happen.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-8 xs:py-12 sm:py-16 px-3 xs:px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 xs:mb-3 sm:mb-4">Get in Touch</h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground">
              Choose your preferred way to connect with us
            </p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 xs:p-6 sm:p-8 border border-border/50 shadow-xl">
            <PlatformContactButtons />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 xs:py-12 sm:py-16 px-3 xs:px-4 sm:px-6 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 xs:mb-3 sm:mb-4">Why Choose Represent+</h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground">
              We're not just another platform – we're your creative partner
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            <div className="text-center p-3 xs:p-4 sm:p-6">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4">
                <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-semibold mb-1 xs:mb-2">Fast Response</h3>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">We typically respond within 2-4 hours during business hours</p>
            </div>
            <div className="text-center p-3 xs:p-4 sm:p-6">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4">
                <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-semibold mb-1 xs:mb-2">Quality Assured</h3>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">Every artist is carefully curated to ensure exceptional quality</p>
            </div>
            <div className="text-center p-3 xs:p-4 sm:p-6">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4">
                <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-semibold mb-1 xs:mb-2">Personal Touch</h3>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">We take the time to understand your unique needs and vision</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 xs:py-12 sm:py-16 px-3 xs:px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 xs:mb-3 sm:mb-4">Ready to Get Started?</h2>
      <p className="text-sm xs:text-base sm:text-lg text-muted-foreground mb-4 xs:mb-6 sm:mb-8">
            Don't wait – your next creative project is just a message away.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center">
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-black font-bold px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full hover:opacity-90 transition-opacity inline-flex items-center justify-center text-sm sm:text-base min-h-[44px]"
            >
              Start a Conversation
            </a>
            <a 
              href="/artists" 
              className="border border-primary text-primary font-semibold px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full hover:bg-primary hover:text-black transition-colors inline-flex items-center justify-center text-sm sm:text-base min-h-[44px]"
            >
              Browse Artists
            </a>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
} 