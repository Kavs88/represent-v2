import React, { memo } from "react";
import PlatformContactButtons from "../../components/ui/PlatformContactButtons";

const ContactPage = memo(function ContactPage() {
  return (
    <div className="min-h-screen relative">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] opacity-100"></div>
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary to-green-500 rounded-full blur-3xl animate-pulse opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-primary to-green-500 rounded-full blur-3xl animate-pulse delay-1000 opacity-30"></div>
      </div>
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-40 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-10xl font-bold mb-4 sm:mb-6 text-white">
            Let's Build Something Real
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Ready to turn your vision into reality? Whether you're a creative looking to break through 
            or a brand that gets it, we're here to make shit happen.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">Get in Touch</h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
              Choose your preferred way to connect with us
            </p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-border/50 shadow-xl">
            <PlatformContactButtons />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">Why Choose <span className="text-green-400">Represent+</span></h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
              We're not just another platform – we're your creative partner
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <div className="text-center p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 md:mb-4">Fast Response</h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">We typically respond within 2-4 hours during business hours</p>
            </div>
            <div className="text-center p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 md:mb-4">Quality Assured</h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">Every artist is carefully curated to ensure exceptional quality</p>
            </div>
            <div className="text-center p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 md:mb-4">Personal Touch</h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">We take the time to understand your unique needs and vision</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">Ready to Move?</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 md:mb-16">
            Don't wait – your next creative project is just a message away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center">
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#17624A] text-white font-bold px-12 py-6 rounded-full shadow-xl hover:brightness-110 transition-all border border-[#17624A]/30 inline-flex items-center justify-center text-2xl"
            >
              Start a Conversation
            </a>
            <a 
              href="/artists" 
              className="bg-[#17624A] text-white font-bold px-12 py-6 rounded-full shadow-xl hover:brightness-110 transition-all border border-[#17624A]/30 inline-flex items-center justify-center text-2xl"
            >
              Browse Artists
            </a>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
});

export default ContactPage; 