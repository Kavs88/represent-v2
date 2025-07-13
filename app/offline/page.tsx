"use client";

import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            You're Offline
          </h1>
          <p className="text-muted-foreground mb-6">
            It looks like you've lost your internet connection. Don't worry, you can still browse cached content.
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/"
            className="block w-full bg-[#17624A] text-white font-bold text-2xl px-12 py-6 rounded-full shadow-xl hover:brightness-110 transition-all border border-[#17624A]/30"
          >
            Go to Homepage
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            className="block w-full bg-[#17624A] text-white font-bold text-2xl px-12 py-6 rounded-full shadow-xl hover:brightness-110 transition-all border border-[#17624A]/30"
          >
            Try Again
          </button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Some features may be limited while offline.</p>
          <p className="mt-2">
            Check your internet connection and try again.
          </p>
        </div>
      </div>
    </div>
  );
} 