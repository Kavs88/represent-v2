import { getArtists } from "@/lib/airtable";
import HomePageClient from "@/components/home/HomePageClient";
import { Artist, Attachment } from '@/types/artist';
import ArticlesSection from '@/components/home/ArticlesSection';
import SEOHead from "@/components/ui/SEOHead";

export const revalidate = 300; // Cache for 5 minutes

export default async function Home() {
  const featuredArtists: Artist[] = await getArtists({ featuredOnly: true });
  const allArtworks: Attachment[] = featuredArtists.flatMap(
    (artist) => artist.fields.Artwork || []
  );

  return (
    <>
      <SEOHead 
        title="AI-Powered Artist Representation Platform"
        description="Discover and connect with exceptional artists through our AI-powered representation platform. Browse curated portfolios, explore unique artworks, and commission custom pieces from talented creators worldwide."
        keywords={['artist representation', 'AI art platform', 'commission artwork', 'artist portfolio', 'contemporary art', 'digital art', 'fine art', 'artists for hire']}
        url="/"
      />
      <main>
        <HomePageClient 
          featuredArtists={featuredArtists} 
          artworks={allArtworks} 
        />
      </main>
    </>
  );
} 