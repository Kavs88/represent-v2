"use client";
import React from "react";
import Link from 'next/link';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import LinkWithCursor from './LinkWithCursor';

const contactMethods = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/1234567890',
    icon: <FaWhatsapp size={28} className="text-white" />,
    bg: 'bg-[#25D366] hover:bg-[#1DA851]',
    label: 'Chat on WhatsApp',
    brand: 'WhatsApp',
  },
  {
    name: 'Zalo',
    href: 'https://zalo.me/1234567890',
    icon: <SiZalo size={28} className="text-white" />,
    bg: 'bg-[#0068FF] hover:bg-[#0052CC]',
    label: 'Message on Zalo',
    brand: 'Zalo',
  },
  {
    name: 'Email',
    href: 'mailto:hello@representplus.com',
    icon: <FaEnvelope size={28} className="text-muted-foreground" />,
    bg: 'bg-muted hover:bg-opacity-80',
    label: 'Send us an Email',
    brand: 'Email',
  },
];

export default function PlatformContactButtons() {
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      {contactMethods.map((method) => (
        <LinkWithCursor
          key={method.name}
          href={method.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center px-3 py-2 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${method.bg} w-full sm:w-1/2 max-w-xs mx-auto`}
          aria-label={`${method.label} - opens in new tab`}
        >
          <div className="flex flex-col items-center justify-center w-full min-h-[44px]">
            <div className="flex items-center justify-center gap-2 w-full">
              <span className="flex-shrink-0">{method.icon}</span>
              <span className="text-base font-bold text-white leading-tight truncate text-center">{method.label}</span>
            </div>
            <span className="text-xs text-white/80 leading-tight truncate text-center mt-0.5">{method.brand}</span>
          </div>
        </LinkWithCursor>
      ))}
    </div>
  );
} 