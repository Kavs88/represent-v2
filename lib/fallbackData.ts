// lib/fallbackData.ts
import { Artist, Attachment } from '@/types/artist';

// Sample artwork images using Airtable-style URLs
const sampleArtworks: Attachment[] = [
  {
    id: "art1",
    url: "https://dl.airtable.com/.attachments/artwork1.jpg",
    filename: "Abstract Composition"
  },
  {
    id: "art2", 
    url: "https://dl.airtable.com/.attachments/artwork2.jpg",
    filename: "Modern Sculpture"
  },
  {
    id: "art3",
    url: "https://dl.airtable.com/.attachments/artwork3.jpg", 
    filename: "Contemporary Art"
  },
  {
    id: "art4",
    url: "https://dl.airtable.com/.attachments/artwork4.jpg",
    filename: "Digital Artwork"
  },
  {
    id: "art5",
    url: "https://dl.airtable.com/.attachments/artwork5.jpg",
    filename: "Mixed Media"
  },
  {
    id: "art6",
    url: "https://dl.airtable.com/.attachments/artwork6.jpg",
    filename: "Abstract Expressionism"
  }
];

// Sample featured artists with artwork
export const fallbackFeaturedArtists: Artist[] = [
  {
    id: "artist1",
    fields: {
      Name: "Sarah Chen",
      Speciality: "Contemporary Abstract",
      Bio: "Pioneering contemporary artist known for bold color palettes and dynamic compositions that challenge traditional boundaries.",
      ProfileImage: [{
        id: "profile1",
        url: "https://dl.airtable.com/.attachments/profile1.jpg",
        filename: "Sarah Chen"
      }],
      Artwork: [sampleArtworks[0], sampleArtworks[1]],
      SocialLinks: "https://instagram.com/sarahchen",
      Tags: ["contemporary", "abstract", "colorful"],
      Featured: true,
      ThemePrimaryColor: "#17624A",
      ThemeBackgroundColor: "#0f2027",
      ThemeTextColor: "#ffffff"
    }
  },
  {
    id: "artist2", 
    fields: {
      Name: "Marcus Rodriguez",
      Speciality: "Digital Sculpture",
      Bio: "Innovative digital sculptor creating immersive 3D experiences that bridge the gap between physical and virtual art.",
      ProfileImage: [{
        id: "profile2",
        url: "https://dl.airtable.com/.attachments/profile2.jpg",
        filename: "Marcus Rodriguez"
      }],
      Artwork: [sampleArtworks[2], sampleArtworks[3]],
      SocialLinks: "https://instagram.com/marcusrodriguez",
      Tags: ["digital", "sculpture", "3D"],
      Featured: true,
      ThemePrimaryColor: "#17624A",
      ThemeBackgroundColor: "#0f2027", 
      ThemeTextColor: "#ffffff"
    }
  },
  {
    id: "artist3",
    fields: {
      Name: "Elena Petrov",
      Speciality: "Mixed Media",
      Bio: "Experimental artist combining traditional techniques with modern technology to create thought-provoking installations.",
      ProfileImage: [{
        id: "profile3", 
        url: "https://dl.airtable.com/.attachments/profile3.jpg",
        filename: "Elena Petrov"
      }],
      Artwork: [sampleArtworks[4], sampleArtworks[5]],
      SocialLinks: "https://instagram.com/elenapetrov",
      Tags: ["mixed-media", "experimental", "installation"],
      Featured: true,
      ThemePrimaryColor: "#17624A",
      ThemeBackgroundColor: "#0f2027",
      ThemeTextColor: "#ffffff"
    }
  }
];

// All sample artworks for the carousel
export const fallbackArtworks: Attachment[] = sampleArtworks;

// Sample articles for the Articles section
export const fallbackArticles = [
  {
    id: "article1",
    title: "The Future of Digital Art",
    excerpt: "Exploring how technology is reshaping the art world and creating new opportunities for artists.",
    image: "https://dl.airtable.com/.attachments/article1.jpg",
    date: "2024-01-15",
    category: "Technology"
  },
  {
    id: "article2",
    title: "Contemporary Art Trends 2024",
    excerpt: "Discover the emerging trends that are defining contemporary art in the digital age.",
    image: "https://dl.airtable.com/.attachments/article2.jpg", 
    date: "2024-01-10",
    category: "Trends"
  },
  {
    id: "article3",
    title: "Artist Spotlight: Sarah Chen",
    excerpt: "An in-depth look at the innovative techniques and bold vision of contemporary artist Sarah Chen.",
    image: "https://dl.airtable.com/.attachments/article3.jpg",
    date: "2024-01-05",
    category: "Spotlight"
  }
]; 