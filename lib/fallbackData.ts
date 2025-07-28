// lib/fallbackData.ts - Fallback data for when Airtable is unavailable

import { Artist, Review, Service, QuickFact } from './airtable';

export const fallbackArtists: Artist[] = [
  {
    id: 'recGdQ0i5a8m3Rdr3',
    fields: {
      Name: 'Sophie Trịnh',
      Speciality: 'Painter & Photographer',
      Bio: 'Sophie is a talented artist specializing in contemporary portraiture and photography. Her work captures the essence of human emotion through vibrant colors and thoughtful composition.',
      ProfileImage: [],
      Artwork: [],
      SocialLinks: 'https://instagram.com/sophietrinh',
      Tags: ['Portrait', 'Photography', 'Contemporary'],
      Featured: true,
      GeneratedBannerImage: [],
      ThemePrimaryColor: '#3B82F6',
      ThemeBackgroundColor: '#F8FAFC',
      ThemeTextColor: '#1F2937'
    }
  },
  {
    id: 'recPPhHTA5rR4hmcD',
    fields: {
      Name: 'Ptolomy',
      Speciality: 'Digital Artist',
      Bio: 'Ptolomy creates stunning digital artwork that pushes the boundaries of imagination. Specializing in surreal landscapes and character design.',
      ProfileImage: [],
      Artwork: [],
      SocialLinks: 'https://twitter.com/ptolomy_art',
      Tags: ['Digital Art', 'Surreal', 'Character Design'],
      Featured: true,
      GeneratedBannerImage: [],
      ThemePrimaryColor: '#8B5CF6',
      ThemeBackgroundColor: '#FDF4FF',
      ThemeTextColor: '#1F2937'
    }
  }
];

export const getFallbackArtist = (id: string): Artist | null => {
  return fallbackArtists.find(artist => artist.id === id) || null;
};

export const fallbackReviews: Review[] = [
  {
    id: 'reciIInrYMtQfT8OQ',
    fields: {
      Artist: ['recGdQ0i5a8m3Rdr3'],
      'Review Text': 'Sophie is the most gifted artist I have met in some time, breathtaking.',
      'Client Name': 'Keith Farrell',
      'Project Type': 'Commissioned Portrait',
      Date: '2025-07-08',
      Featured: true,
      Approved: true
    }
  }
];

export const fallbackServices: Service[] = [
  {
    id: 'rec13MF6BuYVWVu5D',
    fields: {
      Name: 'Custom Portrait',
      Description: 'Hand-drawn portraits from photos',
      'Price Range': '0150-01-01 00:00',
      Category: 'Portraits',
      'Artist ID': ['recGdQ0i5a8m3Rdr3'],
      Featured: true,
      'Image URL': 'https://picsum.photos/seed/portrait1/400/300'
    }
  }
];

export const fallbackQuickFacts: QuickFact[] = [
  {
    id: 'rec1',
    fields: {
      'Artist ID': ['recGdQ0i5a8m3Rdr3'],
      'Fact Type': 'Experience',
      'Fact Value': '5+ years',
      'Icon': '🎨',
      'Order': 1,
      'Featured': true
    }
  },
  {
    id: 'rec2',
    fields: {
      'Artist ID': ['recGdQ0i5a8m3Rdr3'],
      'Fact Type': 'Specialty',
      'Fact Value': 'Portrait Painting',
      'Icon': '👤',
      'Order': 2,
      'Featured': true
    }
  }
];

// Add the missing exports for the homepage
export const fallbackFeaturedArtists: Artist[] = fallbackArtists;

export const fallbackArtworks = [
  {
    id: "art1",
    url: "https://picsum.photos/seed/artwork1/800/600",
    filename: "Abstract Composition",
    size: 1024,
    type: "image/jpeg"
  },
  {
    id: "art2", 
    url: "https://picsum.photos/seed/artwork2/800/600",
    filename: "Modern Sculpture",
    size: 1024,
    type: "image/jpeg"
  },
  {
    id: "art3",
    url: "https://picsum.photos/seed/artwork3/800/600",
    filename: "Contemporary Art",
    size: 1024,
    type: "image/jpeg"
  }
]; 