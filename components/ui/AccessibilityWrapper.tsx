"use client";
import React, { useEffect, useRef } from 'react';

interface AccessibilityWrapperProps {
  children: React.ReactNode;
  skipToMain?: boolean;
  skipToNav?: boolean;
}

export default function AccessibilityWrapper({
  children,
  skipToMain = true,
  skipToNav = true,
}: AccessibilityWrapperProps) {
  const mainRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Focus management for modals and overlays
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close any open modals or menus
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement?.closest('[role="dialog"]') || activeElement?.closest('.modal')) {
          const closeButton = activeElement.querySelector('[aria-label*="close"], [aria-label*="Close"]') as HTMLElement;
          closeButton?.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50">
        {skipToMain && (
          <a
            href="#main-content"
            className="bg-primary text-black px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              mainRef.current?.focus();
              mainRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Skip to main content
          </a>
        )}
        {skipToNav && (
          <a
            href="#main-navigation"
            className="bg-primary text-black px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity ml-2"
            onClick={(e) => {
              e.preventDefault();
              navRef.current?.focus();
              navRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Skip to navigation
          </a>
        )}
      </div>

      {/* ARIA Live Regions */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="aria-live-region"
      />

      {/* Status Messages */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        id="status-messages"
      />

      {/* Enhanced children with refs */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childProps = child.props as any;
          if (child.type === 'main' || childProps.id === 'main-content') {
            return React.cloneElement(child, {
              ref: mainRef,
              tabIndex: -1,
              'aria-label': 'Main content',
            } as any);
          }
          if (child.type === 'nav' || childProps.id === 'main-navigation') {
            return React.cloneElement(child, {
              ref: navRef,
              tabIndex: -1,
              'aria-label': 'Main navigation',
            } as any);
          }
        }
        return child;
      })}
    </>
  );
}

// Utility function to announce status messages
export const announceStatus = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const region = document.getElementById(priority === 'assertive' ? 'status-messages' : 'aria-live-region');
  if (region) {
    region.textContent = message;
    // Clear the message after a short delay
    setTimeout(() => {
      region.textContent = '';
    }, 1000);
  }
};

// Utility function to manage focus trap
export const createFocusTrap = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  firstElement?.focus();

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}; 