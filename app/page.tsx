import { getArtists } from "@/lib/airtable";
import HomePageClient from "@/components/home/HomePageClient";
import { Artist, Attachment } from '@/types/artist';
import ArticlesSection from '@/components/home/ArticlesSection';
import SEOHead from "@/components/ui/SEOHead";
import { Suspense } from 'react';
import { fallbackFeaturedArtists, fallbackArtworks } from "@/lib/fallbackData";

export const revalidate = 300; // Cache for 5 minutes

// Loading component for better UX
function HomePageLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted">Loading exceptional talent...</p>
      </div>
    </div>
  );
}

export default async function Home() {
  // Fetch data with error handling and fallbacks
  let featuredArtists: Artist[] = [];
  let allArtworks: Attachment[] = [];
  
  try {
    // Fetch featured artists with timeout
    const artistsPromise = getArtists({ featuredOnly: true });
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    );
    
    featuredArtists = await Promise.race([artistsPromise, timeoutPromise]) as Artist[];
    
    // Extract artworks from featured artists
    allArtworks = featuredArtists.flatMap(
      (artist) => artist.fields.Artwork || []
    );
  } catch (error) {
    console.error('Error fetching home page data:', error);
    // Use fallback data when API fails
    console.log('Using fallback data due to API failure');
    featuredArtists = fallbackFeaturedArtists;
    allArtworks = fallbackArtworks;
  }

  return (
    <>
      <SEOHead 
        title="AI-Powered Artist Representation Platform"
        description="Discover and connect with exceptional artists through our AI-powered representation platform. Browse curated portfolios, explore unique artworks, and commission custom pieces from talented creators worldwide."
        keywords={['artist representation', 'AI art platform', 'commission artwork', 'artist portfolio', 'contemporary art', 'digital art', 'fine art', 'artists for hire']}
        url="/"
      />
      <Suspense fallback={<HomePageLoading />}>
        <main>
          <HomePageClient 
            featuredArtists={featuredArtists} 
            artworks={allArtworks} 
          />
        </main>
      </Suspense>
    </>
  );
} 