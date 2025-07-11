"use client";
import { FaInstagram, FaTwitter, FaArtstation } from 'react-icons/fa';

const socialLinks = [
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
  { name: 'Artstation', icon: FaArtstation, url: 'https://artstation.com' },
];

export const SocialLinks = () => (
  <div className="flex gap-4">
    {socialLinks.map((link) => (
      <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-muted hover:text-primary transition-colors">
        <link.icon size={24} />
      </a>
    ))}
  </div>
); 