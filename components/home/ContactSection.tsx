import React from 'react';
import PlatformContactButtons from '@/components/ui/PlatformContactButtons';

export default function ContactSection() {
  return (
    <section className="py-24 bg-card border-t border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
          Connect With Us Directly
        </h2>
        <p className="text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
          Ready to discover exceptional talent or showcase your creative work? 
          Let's start a conversation about how we can help elevate your artistic vision.
        </p>
        
        <div className="flex justify-center">
          <PlatformContactButtons />
        </div>
      </div>
    </section>
  );
} 