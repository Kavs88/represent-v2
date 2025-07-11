"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Logo } from "../ui/Logo";
import LinkWithCursor from '../ui/LinkWithCursor';

const navLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const debouncedScrollHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Memoize navigation links to prevent unnecessary re-renders
  const desktopNavLinks = useMemo(() => (
    navLinks.map((link) => (
      <LinkWithCursor 
        key={link.href} 
        href={link.href} 
        className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1"
      >
        {link.label}
      </LinkWithCursor>
    ))
  ), []);

  const mobileNavLinks = useMemo(() => (
    navLinks.map((link) => (
      <LinkWithCursor 
        key={link.href} 
        href={link.href} 
        className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background min-h-[44px] flex items-center justify-center" 
        onClick={() => setIsMenuOpen(false)}
      >
        {link.label}
      </LinkWithCursor>
    ))
  ), []);

  return (
    <header 
      className={`w-full sticky top-0 left-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4">
        <Logo />
        {/* Desktop nav */}
        <nav 
          className="hidden lg:flex gap-6 xl:gap-8 text-sm xl:text-base font-medium items-center"
          id="main-navigation"
          role="navigation"
          aria-label="Main navigation"
        >
          {desktopNavLinks}
          <LinkWithCursor 
            href="/contact" 
            className="font-bold px-4 xl:px-5 py-2 rounded-full hover:opacity-90 transition-opacity ml-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            style={{ backgroundColor: '#17624A', color: '#fff' }}
          >
            Let's Talk
          </LinkWithCursor>
        </nav>
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden flex items-center justify-center w-12 h-12 xs:w-10 xs:h-10 rounded hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1 transition-transform" style={{ transform: isMenuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none' }} />
          <span className="block w-6 h-0.5 bg-white mb-1 transition-opacity" style={{ opacity: isMenuOpen ? 0 : 1 }} />
          <span className="block w-6 h-0.5 bg-white transition-transform" style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none' }} />
        </button>
      </div>
      {/* Mobile dropdown menu - Lazy loaded for better performance */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-30"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Dropdown */}
          <div 
            className="absolute top-full right-0 w-64 xs:w-72 bg-background/95 backdrop-blur-sm border border-border shadow-2xl rounded-b-2xl lg:hidden z-40"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
          <nav className="flex flex-col p-4" role="navigation" aria-label="Mobile navigation">
            {/* Navigation Links */}
            <div className="space-y-2 mb-4">
              {mobileNavLinks}
            </div>
            
            {/* Divider */}
            <div className="border-t border-border my-2"></div>
            
            {/* CTA Button */}
            <LinkWithCursor 
              href="/contact" 
              className="w-full font-bold px-4 py-3 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background min-h-[44px] flex items-center justify-center text-center"
              style={{ backgroundColor: '#17624A', color: '#fff' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Let's Talk
            </LinkWithCursor>
          </nav>
        </div>
        </>
      )}
    </header>
  );
} 