// app/artists/[id]/page.tsx

import { getArtistById, getArtistReviews, getArtistFeaturedServices, getArtistQuickFacts } from "@/lib/airtable";
import { getFallbackArtist, fallbackReviews, fallbackServices, fallbackQuickFacts } from "@/lib/fallbackData";
import { notFound } from "next/navigation";
import ArtistPageClient from "./ArtistPageClient";
import SEOHead from "@/components/ui/SEOHead";

export const revalidate = 300; // Cache for 5 minutes

// This is a Server Component, so it can be async
export default async function ArtistPage({ params }: { params: { id: string } }) {
  console.log(`ArtistPage: Fetching data for artist ID: ${params.id}`);
  
  try {
    // 1. Fetch this specific artist's data and reviews on the server
    let [artist, reviews, services, quickFacts] = await Promise.all([
      getArtistById(params.id),
      getArtistReviews(params.id),
      getArtistFeaturedServices(params.id),
      getArtistQuickFacts(params.id)
    ]);

    console.log(`ArtistPage: Artist found:`, artist?.fields.Name);
    console.log(`ArtistPage: Reviews found:`, reviews.length);

    // 2. If no artist is found, try fallback data
    if (!artist) {
      console.log(`ArtistPage: No artist found for ID ${params.id}, trying fallback data`);
      artist = getFallbackArtist(params.id);
      
      if (!artist) {
        console.log(`ArtistPage: No fallback artist found for ID ${params.id}, showing 404`);
        notFound();
      }
    }

    // 3. Use fallback data if API calls failed
    if (!reviews || reviews.length === 0) {
      console.log(`ArtistPage: Using fallback reviews for artist ${params.id}`);
      reviews = fallbackReviews.filter(review => 
        review.fields.Artist.includes(params.id)
      );
    }

    if (!services || services.length === 0) {
      console.log(`ArtistPage: Using fallback services for artist ${params.id}`);
      services = fallbackServices.filter(service => 
        service.fields['Artist ID'].includes(params.id)
      );
    }

    if (!quickFacts || quickFacts.length === 0) {
      console.log(`ArtistPage: Using fallback quick facts for artist ${params.id}`);
      quickFacts = fallbackQuickFacts.filter(fact => 
        fact.fields['Artist ID'].includes(params.id)
      );
    }

  // Generate SEO data for the artist
  const artistSEO = {
    name: artist.fields.Name,
    bio: artist.fields.Bio || `Explore ${artist.fields.Name}'s unique artistic style and portfolio.`,
    artworks: artist.fields.Artwork?.map(art => ({
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
      <ArtistPageClient artist={artist} reviews={reviews} services={services} quickFacts={quickFacts} />
    </>
  );
  } catch (error) {
    console.error(`ArtistPage: Error fetching artist data for ID ${params.id}:`, error);
    
    // Return a user-friendly error page instead of 404
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Artist Profile Temporarily Unavailable
          </h1>
          <p className="text-gray-600 mb-6">
            We're experiencing connectivity issues. Please try again in a few moments.
          </p>
          <a 
            href="/artists" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Artists
          </a>
        </div>
      </div>
    );
  }
}