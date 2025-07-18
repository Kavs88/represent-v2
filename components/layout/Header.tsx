"use client";
import React, { useState, useEffect } from "react";
import { Logo } from "../ui/Logo";
import LinkWithCursor from '../ui/LinkWithCursor';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: "/artists", label: "The Roster" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Connect" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isArtistProfile = /^\/artists\/[\w-]+$/.test(pathname);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
            {/* Logo + Back to Roster */}
            <div className="flex-shrink-0 flex flex-col items-start">
              <div className="flex items-center">
                <Logo />
                {/* Desktop: Back to Roster inline */}
                {isArtistProfile && (
                  <LinkWithCursor
                    href="/artists"
                    className="hidden lg:inline-flex ml-4 px-4 py-2.5 rounded-full font-bold text-base bg-[#17624A] text-white transition-all duration-200 hover:scale-105 hover:shadow-lg min-h-[44px] items-center"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    Back to Roster
                  </LinkWithCursor>
                )}
              </div>
              {/* Mobile: Back to Roster stacked */}
              {isArtistProfile && (
                <LinkWithCursor
                  href="/artists"
                  className="lg:hidden mt-2 px-4 py-2.5 rounded-full font-bold text-base bg-[#17624A] text-white transition-all duration-200 hover:scale-105 hover:shadow-lg min-h-[44px] inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  Back to Roster
                </LinkWithCursor>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <LinkWithCursor 
              key={link.href} 
              href={link.href} 
                  className="text-xl sm:text-2xl font-medium text-foreground hover:text-primary transition-colors duration-200 py-3 px-4 rounded-md hover:bg-accent/50 flex items-center h-full"
            >
              {link.label}
            </LinkWithCursor>
          ))}
          <LinkWithCursor 
            href="/contact" 
                className="bg-[#17624A] text-white font-bold text-xl px-10 py-4 rounded-full shadow-xl hover:brightness-110 transition-all border border-[#17624A]/30 flex items-center h-full"
          >
                Get Started
          </LinkWithCursor>
        </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
        <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 rounded-md text-foreground hover:bg-accent/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                  }`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                  }`}></span>
                </div>
        </button>
      </div>
          </div>
        </div>

        {/* Mobile Menu */}
      {isMenuOpen && (
          <div className="lg:hidden mobile-menu">
          {/* Backdrop */}
          <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeMenu}
            ></div>
            
            {/* Menu Content */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-md border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <Logo />
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-md text-foreground hover:bg-accent/50 transition-colors duration-200"
                    aria-label="Close menu"
          >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

            {/* Navigation Links */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-4">
              {navLinks.map((link) => (
                <LinkWithCursor 
                  key={link.href} 
                  href={link.href} 
                        onClick={closeMenu}
                        className="block text-2xl sm:text-3xl font-medium text-foreground hover:text-primary transition-colors duration-200 py-4 px-4 rounded-lg hover:bg-accent/50"
                >
                  {link.label}
                </LinkWithCursor>
              ))}
            </div>
                </nav>
            
            {/* CTA Button */}
                <div className="p-6 border-t border-border">
            <LinkWithCursor 
              href="/contact" 
                    onClick={closeMenu}
                    className="block w-full bg-[#17624A] text-white font-bold text-xl px-10 py-4 rounded-full shadow-xl hover:brightness-110 transition-all border border-[#17624A]/30 text-center"
            >
                    Get Started
            </LinkWithCursor>
                </div>
              </div>
            </div>
        </div>
      )}
    </header>
      
      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-20 sm:h-24 lg:h-28"></div>
    </>
  );
} 