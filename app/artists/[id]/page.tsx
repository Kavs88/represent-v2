// app/artists/[id]/page.tsx

import { getArtistById, getArtistReviews } from "@/lib/airtable";
import { notFound } from "next/navigation";
import ArtistPageClient from "./ArtistPageClient";
import SEOHead from "@/components/ui/SEOHead";
import { Suspense } from 'react';
import { Attachment } from '@/types/artist';

export const revalidate = 300;

// Loading component for better UX
function ArtistPageLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted">Loading artist profile...</p>
      </div>
    </div>
  );
}

// This is a Server Component, so it can be async
export default async function ArtistPage({ params }: { params: { id: string } }) {
  console.log(`ArtistPage: Fetching data for artist ID: ${params.id}`);
  
  let artist = null;
  let reviews: any[] = [];
  
  try {
    // Fetch data with timeout protection
    const [artistPromise, reviewsPromise] = [
      getArtistById(params.id),
      getArtistReviews(params.id)
    ];
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 15000)
    );
    
    const results = await Promise.race([
      Promise.all([artistPromise, reviewsPromise]),
      timeoutPromise
    ]) as [any, any[]];
    
    [artist, reviews] = results;
    
    console.log(`ArtistPage: Artist found:`, artist?.fields.Name);
    console.log(`ArtistPage: Reviews found:`, reviews.length);
  } catch (error) {
    console.error('Error fetching artist data:', error);
    // Continue with null artist - will trigger 404
  }

  // 2. If no artist is found, immediately show the 404 page
  if (!artist) {
    notFound();
  }

  // Generate SEO data for the artist
  const artistSEO = {
    name: artist.fields.Name,
    bio: artist.fields.Bio || `Explore ${artist.fields.Name}'s unique artistic style and portfolio.`,
    artworks: artist.fields.Artwork?.map((art: Attachment) => ({
      title: art.filename || 'Artwork',
      description: art.filename || 'Artwork by ' + artist.fields.Name,
      imageUrl: art.url
    })) || []
  };

  // The Server Shell's only job is to fetch data and pass it to the Client Core.
  return (
    <>
      <SEOHead 
        title={artist.fields.Name}
        description={`${artist.fields.Bio || `Discover ${artist.fields.Name}'s unique artistic style`}${artist.fields.Speciality ? ` - Specializing in ${artist.fields.Speciality}` : ''}. Browse portfolio and commission custom artwork.`}
        keywords={[
          artist.fields.Name,
          artist.fields.Speciality || 'artist',
          'artist portfolio',
          'commission artwork',
          'custom art',
          ...(artist.fields.Tags || [])
        ]}
        url={`/artists/${artist.id}`}
        type="profile"
        artist={artistSEO}
      />
      <Suspense fallback={<ArtistPageLoading />}>
        <ArtistPageClient artist={artist} reviews={reviews} />
      </Suspense>
    </>
  );
}