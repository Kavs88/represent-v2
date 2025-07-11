"use client";

import React from 'react';
import PlatformContactButtons from './PlatformContactButtons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName?: string;
  themePrimaryColor?: string;
  themeBackgroundColor?: string;
  themeTextColor?: string;
}

export default function ContactModal({ 
  isOpen, 
  onClose, 
  artistName, 
  themePrimaryColor = '#00ff9d',
  themeBackgroundColor = '#0E0E0E',
  themeTextColor = '#E5E5E5'
}: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal */}
      <div 
        className="relative max-w-lg w-full"
        style={{
          backgroundColor: `${themeBackgroundColor}ee`,
          border: `1px solid ${themePrimaryColor}30`,
          borderRadius: '24px'
        }}
      >
        {/* Header */}
        <div className="relative p-8 pb-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center"
            style={{
              backgroundColor: `${themePrimaryColor}20`,
              color: themePrimaryColor
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header Content */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{
              backgroundColor: `${themePrimaryColor}20`,
              border: `2px solid ${themePrimaryColor}40`
            }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: themePrimaryColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-2" style={{ color: themeTextColor }}>
              Let's Start Your Project
            </h2>
            
            {artistName && (
              <>
                <p className="text-lg mb-1" style={{ color: `${themeTextColor}90` }}>
                  Thanks for your interest in working with
                </p>
                <p className="text-xl font-semibold mb-6" style={{ color: themePrimaryColor }}>
                  {artistName}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="px-8">
          <div className="h-px" style={{ backgroundColor: `${themePrimaryColor}20` }} />
        </div>

        {/* Content */}
        <div className="p-8 pt-6">
          <div className="text-center mb-8">
            <p className="text-base leading-relaxed" style={{ color: `${themeTextColor}80` }}>
              Choose your preferred way to get in touch and let's discuss your creative vision.
            </p>
          </div>
          
          {/* Contact Options */}
          <div className="space-y-4">
            <PlatformContactButtons />
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 text-center">
            <p className="text-sm" style={{ color: `${themeTextColor}60` }}>
              We typically respond within 2-4 hours during business hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 