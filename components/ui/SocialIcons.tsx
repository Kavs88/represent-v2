import React from "react";
import { FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const socials = [
  { href: "https://twitter.com/representplus", label: "Twitter", icon: <FaTwitter size={22} /> },
  { href: "https://instagram.com/representplus", label: "Instagram", icon: <FaInstagram size={22} /> },
  { href: "mailto:hello@represent.plus", label: "Email", icon: <FaEnvelope size={22} /> },
];

export default function SocialIcons() {
  return (
    <nav aria-label="Social links" className="flex gap-4 mt-2">
      {socials.map((s) => (
        <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:text-primary transition-colors">
          {s.icon}
        </a>
      ))}
    </nav>
  );
} 