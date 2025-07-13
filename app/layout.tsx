import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/lora-font.css'
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import { GlobalMotionWrapper } from '@/components/ui/GlobalMotionWrapper'
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper'
import PerformanceMonitor from '@/components/ui/PerformanceMonitor'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Lora is now self-hosted via CSS

export const metadata: Metadata = {
  title: {
    default: 'Represent+ - Creative Partnership Platform',
    template: '%s | Represent+'
  },
  description: 'Connect with bold creatives who refuse to compromise. Browse curated portfolios, commission custom work, and build partnerships that actually matter.',
  keywords: ['artist representation', 'creative partnership', 'commission artwork', 'artist portfolio', 'contemporary art', 'digital art', 'fine art', 'artists for hire'],
  authors: [{ name: 'Represent+ Team' }],
  creator: 'Represent+',
  publisher: 'Represent+',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://representplus.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://representplus.com',
    siteName: 'Represent+',
    title: 'Represent+ - Creative Partnership Platform',
    description: 'Connect with bold creatives who refuse to compromise. Browse curated portfolios, commission custom work, and build partnerships that actually matter.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Represent+ - Creative Partnership Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Represent+ - Creative Partnership Platform',
    description: 'Connect with bold creatives who refuse to compromise.',
    images: ['/og-image.jpg'],
    creator: '@representplus',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="bg-background font-sans text-foreground flex flex-col min-h-screen">
        <PerformanceMonitor />
        <GlobalMotionWrapper>
          <Header />
          <PageTransitionWrapper>
            <main className="flex-grow" id="main-content">{children}</main>
          </PageTransitionWrapper>
          <Footer />
        </GlobalMotionWrapper>
      </body>
    </html>
  )
} 