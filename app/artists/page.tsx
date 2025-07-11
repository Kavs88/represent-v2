import { getArtists, getAllTags } from "@/lib/airtable";
import ArtistsPageClient from "./ArtistsPageClient";
import SEOHead from "@/components/ui/SEOHead";

export const revalidate = 300; // Cache for 5 minutes

export default async function ArtistsPage() {
  // Fetch all data in parallel for optimal performance
  const [artists, allTags] = await Promise.all([
    getArtists(),
    getAllTags()
  ]);

  //   console.log('ArtistsPage fetched:', { artists, allTags });

  return (
    <>
      <SEOHead 
        title="Our Artists"
        description={`Explore our curated collection of ${artists.length} exceptional artists. Discover unique styles, browse portfolios, and commission custom artwork from talented creators across various mediums and specialties.`}
        keywords={['artists', 'artist portfolio', 'commission artwork', 'art gallery', 'contemporary artists', 'digital artists', 'fine art', 'custom artwork']}
        url="/artists"
      />
      <ArtistsPageClient artists={artists} allTags={allTags} />
    </>
  );
} 