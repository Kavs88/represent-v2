import React from "react";
import { Logo } from "../ui/Logo";
import LinkWithCursor from '../ui/LinkWithCursor';
import SocialIcons from "../ui/SocialIcons";

const navLinks = [
  { href: "/artists", label: "The Roster" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Connect" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border py-8 sm:py-12 px-4 sm:px-6 mt-12 sm:mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Logo and brand */}
        <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
          <Logo />
          <span className="text-base sm:text-lg font-bold tracking-tight">Represent+</span>
          <span className="text-xs text-muted-foreground">Creative Partnership Platform</span>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col items-center gap-2 sm:items-center">
          <span className="uppercase text-xs font-semibold text-muted-foreground mb-2">Navigation</span>
          {navLinks.map((link) => (
            <LinkWithCursor key={link.href} href={link.href} className="hover:text-primary transition-colors text-sm sm:text-base">
              {link.label}
            </LinkWithCursor>
          ))}
        </nav>
        {/* Socials */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <span className="uppercase text-xs font-semibold text-muted-foreground mb-2">Connect</span>
          <SocialIcons />
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-6 sm:mt-8 px-4">&copy; {new Date().getFullYear()} Represent+. Built for creatives, by creatives.</div>
    </footer>
  );
} 