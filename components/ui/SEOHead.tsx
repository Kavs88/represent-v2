import React from 'react';
import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  artist?: {
    name: string;
    bio: string;
    artworks: Array<{
      title: string;
      description: string;
      imageUrl: string;
    }>;
  };
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url,
  type = 'website',
  artist,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | Represent GPT` : 'Represent GPT - AI-Powered Artist Representation Platform';
  const fullDescription = description || 'Discover and connect with exceptional artists through our AI-powered representation platform.';
  const fullUrl = url ? `https://representgpt.com${url}` : 'https://representgpt.com';

  // Generate structured data for artists
  const generateStructuredData = () => {
    if (artist) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: artist.name,
        description: artist.bio,
        image: artist.artworks[0]?.imageUrl,
        works: artist.artworks.map(artwork => ({
          '@type': 'CreativeWork',
          name: artwork.title,
          description: artwork.description,
          image: artwork.imageUrl,
        })),
        url: fullUrl,
      };
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Represent GPT',
      description: fullDescription,
      url: 'https://representgpt.com',
      logo: 'https://representgpt.com/logo.png',
      sameAs: [
        'https://twitter.com/representgpt',
        'https://instagram.com/representgpt',
        'https://linkedin.com/company/representgpt',
      ],
    };
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Represent GPT" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@representgpt" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Represent GPT Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
} 