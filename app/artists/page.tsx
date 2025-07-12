import { getArtists, getAllTags } from "@/lib/airtable";
import ArtistsPageClient from "./ArtistsPageClient";
import SEOHead from "@/components/ui/SEOHead";
import { Suspense } from 'react';

export const revalidate = 300; // Cache for 5 minutes

// Loading component for better UX
function ArtistsPageLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted">Loading artists...</p>
      </div>
    </div>
  );
}

export default async function ArtistsPage() {
  // Fetch all data in parallel for optimal performance with error handling
  let artists: any[] = [];
  let allTags: string[] = [];
  
  try {
    // Fetch data with timeout protection
    const [artistsPromise, tagsPromise] = [
      getArtists(),
      getAllTags()
    ];
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 15000)
    );
    
    const results = await Promise.race([
      Promise.all([artistsPromise, tagsPromise]),
      timeoutPromise
    ]) as [any[], string[]];
    
    [artists, allTags] = results;
  } catch (error) {
    console.error('Error fetching artists page data:', error);
    // Continue with empty arrays - the page will still render
  }

  return (
    <>
      <SEOHead 
        title="Our Artists"
        description={`Explore our curated collection of ${artists.length} exceptional artists. Discover unique styles, browse portfolios, and commission custom artwork from talented creators across various mediums and specialties.`}
        keywords={['artists', 'artist portfolio', 'commission artwork', 'art gallery', 'contemporary artists', 'digital artists', 'fine art', 'custom artwork']}
        url="/artists"
      />
      <Suspense fallback={<ArtistsPageLoading />}>
        <ArtistsPageClient artists={artists} allTags={allTags} />
      </Suspense>
    </>
  );
} 