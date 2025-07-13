import { useMemo } from 'react';
import { getOptimalTextColor, validateColorAccessibility } from '@/lib/colorUtils';

interface UseColorContrastOptions {
  backgroundColor: string;
  fallbackTextColor?: string;
  includeValidation?: boolean;
}

interface UseColorContrastReturn {
  textColor: string;
  tagBg: string;
  shadowColor: string;
  contrastRatio: number;
  isAccessible: boolean;
  validation?: {
    isValid: boolean;
    wcagLevel: 'AAA' | 'AA' | 'FAIL';
    suggestions: string[];
  };
}

export function useColorContrast({
  backgroundColor,
  fallbackTextColor = '#ffffff',
  includeValidation = false
}: UseColorContrastOptions): UseColorContrastReturn {
  
  const colorData = useMemo(() => {
    if (!backgroundColor) {
      return {
        textColor: fallbackTextColor,
        tagBg: fallbackTextColor === '#ffffff' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.08)',
        shadowColor: fallbackTextColor === '#ffffff' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
        contrastRatio: 21,
        isAccessible: true
      };
    }

    const optimal = getOptimalTextColor(backgroundColor);
    
    // Include validation if requested
    const validation = includeValidation 
      ? validateColorAccessibility(backgroundColor, optimal.textColor)
      : undefined;

    return {
      ...optimal,
      validation
    };
  }, [backgroundColor, fallbackTextColor, includeValidation]);

  return colorData;
}

// Specialized hook for artist cards
export function useArtistCardColors(artist: any, themeColor?: string) {
  const bgColor = artist?.fields?.ThemePrimaryColor || themeColor || 'var(--card, #18181b)';
  
  return useColorContrast({
    backgroundColor: bgColor,
    fallbackTextColor: '#ffffff',
    includeValidation: process.env.NODE_ENV === 'development'
  });
}

// Specialized hook for text on colored backgrounds
export function useTextContrast(backgroundColor: string, textColor?: string) {
  const optimal = useColorContrast({ backgroundColor });
  
  // If a specific text color is provided, validate it
  const validation = textColor 
    ? validateColorAccessibility(backgroundColor, textColor)
    : undefined;

  return {
    ...optimal,
    providedTextColor: textColor,
    validation
  };
} 