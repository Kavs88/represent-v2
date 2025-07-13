import Link from "next/link";
import Image from "next/image";
import { Artist } from '@/types/artist';
import { useArtistCardColors } from '@/hooks/useColorContrast';

export function ArtistCard({ artist, themeColor }: { artist: Artist; themeColor?: string }) {
  const { textColor, tagBg, shadowColor, contrastRatio, isAccessible, validation } = useArtistCardColors(artist, themeColor);
  
  // Add a subtle warning if contrast is not optimal (for development/debugging)
  if (!isAccessible && process.env.NODE_ENV === 'development') {
    console.warn(`Low contrast detected for artist ${artist.fields.Name}: ${contrastRatio.toFixed(2)}:1`);
    if (validation) {
      console.warn(`WCAG Level: ${validation.wcagLevel}`);
      validation.suggestions.forEach(suggestion => console.warn(`Suggestion: ${suggestion}`));
    }
  }
  
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="group block rounded-xl border border-border shadow-lg overflow-hidden w-full flex flex-col bg-card transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background"
      style={{ 
        background: artist.fields.ThemePrimaryColor || themeColor || 'var(--card, #18181b)',
        boxShadow: `0 4px 6px -1px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`
      }}
      aria-label={`View ${artist.fields.Name}'s profile and artwork${artist.fields.Speciality ? ` - ${artist.fields.Speciality}` : ''}`}
    >
      {/* Profile Image Section - Similar to Articles image area */}
      <div className="relative w-full aspect-video overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-4 bg-background overflow-hidden flex items-center justify-center"
            style={{ borderColor: artist.fields.ThemePrimaryColor || themeColor || 'var(--primary, #00ff9d)' }}
            role="img"
            aria-label={`${artist.fields.Name}'s profile picture`}
          >
            <Image
              src={artist.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'}
              alt=""
              fill
              sizes="(max-width: 375px) 64px, (max-width: 640px) 80px, (max-width: 1024px) 96px"
              className="object-cover rounded-full"
              priority={false}
            />
          </div>
        </div>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Content Section - Similar to Articles content area */}
      <div className="flex-1 flex flex-col p-3">
        {/* Artist Name */}
        <h3 
          className="text-lg font-bold mb-1 text-center drop-shadow-sm" 
          style={{ 
            color: textColor, 
            lineHeight: 1.15,
            textShadow: textColor === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(255,255,255,0.3)'
          }}
        >
          {artist.fields.Name}
        </h3>
        
        {/* Specialty */}
        {artist.fields.Speciality && (
          <p 
            className="text-sm text-center mb-2 flex-1 drop-shadow-sm" 
            style={{ 
              color: textColor, 
              opacity: 0.8,
              textShadow: textColor === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(255,255,255,0.3)'
            }}
          >
            {artist.fields.Speciality}
          </p>
        )}
        
        {/* Tags */}
        {artist.fields.Tags && artist.fields.Tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mb-2">
            {artist.fields.Tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 rounded-full text-xs font-semibold drop-shadow-sm" 
                style={{ 
                  background: tagBg, 
                  color: textColor,
                  textShadow: textColor === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(255,255,255,0.3)'
                }}
              >
                {tag}
              </span>
            ))}
            {artist.fields.Tags.length > 2 && (
              <span 
                className="px-2 py-1 rounded-full text-xs font-medium drop-shadow-sm" 
                style={{ 
                  background: tagBg, 
                  color: textColor,
                  opacity: 0.8,
                  textShadow: textColor === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(255,255,255,0.3)'
                }}
              >
                +{artist.fields.Tags.length - 2} more
              </span>
            )}
          </div>
        )}
        
        {/* Call to Action - Similar to Articles "Read More" */}
        <div className="mt-auto text-center">
          <span 
            className="text-sm font-semibold hover:underline transition-colors inline-flex items-center gap-1" 
            style={{ 
              color: artist.fields.ThemePrimaryColor || themeColor || '#00ff9d',
              textShadow: textColor === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(255,255,255,0.3)'
            }}
          >
            View Profile &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
} 