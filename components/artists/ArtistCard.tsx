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
      className="group block rounded-xl border border-border shadow-lg overflow-hidden w-full max-w-xs h-auto flex flex-col bg-card transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background"
      style={{ 
        background: artist.fields.ThemePrimaryColor || themeColor || 'var(--card, #18181b)',
        boxShadow: `0 4px 6px -1px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`
      }}
      aria-label={`View ${artist.fields.Name}'s profile and artwork${artist.fields.Speciality ? ` - ${artist.fields.Speciality}` : ''}`}
    >
      {/* Prominent Image section: larger, centered, no filename */}
      <div className="flex flex-col items-center justify-center" style={{minHeight: '180px'}}>
        <div className="flex-1" />
        <div
          className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full border-4 bg-background overflow-hidden flex items-center justify-center shadow-xl"
          style={{ borderColor: artist.fields.ThemePrimaryColor || themeColor || 'var(--primary, #00ff9d)' }}
          role="img"
          aria-label={`${artist.fields.Name}'s profile picture`}
        >
          <Image
            src={artist.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'}
            alt=""
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 192px"
            className="object-cover rounded-full"
            priority={false}
            draggable={false}
          />
        </div>
        <div className="flex-1" />
      </div>
      {/* Content Section: name is most prominent, no filename shown */}
      <div className="flex-1 flex flex-col items-center justify-start px-3 sm:px-4 pb-4">
        <h3 
          className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center leading-tight mb-2 tracking-tight" 
          style={{ 
            color: textColor, 
            textShadow: textColor === '#ffffff' ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(255,255,255,0.15)'
          }}
        >
          {artist.fields.Name}
        </h3>
        {artist.fields.Speciality && (
          <p 
            className="text-sm sm:text-base md:text-lg text-center mb-2 leading-tight opacity-80 font-medium" 
            style={{ 
              color: textColor, 
              textShadow: textColor === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.15)' : '0 1px 2px rgba(255,255,255,0.10)'
            }}
          >
            {artist.fields.Speciality}
          </p>
        )}
        {artist.fields.Tags && artist.fields.Tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mb-3">
            {artist.fields.Tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 rounded-full text-xs font-medium drop-shadow-sm opacity-80" 
                style={{ 
                  background: tagBg, 
                  color: textColor,
                  textShadow: textColor === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.10)' : '0 1px 2px rgba(255,255,255,0.10)'
                }}
              >
                {tag}
              </span>
            ))}
            {artist.fields.Tags.length > 2 && (
              <span 
                className="px-2 py-1 rounded-full text-xs font-medium drop-shadow-sm opacity-60" 
                style={{ 
                  background: tagBg, 
                  color: textColor,
                  textShadow: textColor === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.10)' : '0 1px 2px rgba(255,255,255,0.10)'
                }}
              >
                +{artist.fields.Tags.length - 2} more
              </span>
            )}
          </div>
        )}
        <div className="mt-auto text-center w-full">
          <span 
            className="text-sm sm:text-base font-semibold hover:underline transition-colors inline-flex items-center gap-1 opacity-90" 
            style={{ 
              color: artist.fields.ThemePrimaryColor || themeColor || '#00ff9d',
              textShadow: textColor === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.10)' : '0 1px 2px rgba(255,255,255,0.10)'
            }}
          >
            View Profile &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
} 