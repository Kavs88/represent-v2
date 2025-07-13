# Automatic Color Contrast System

The Represent+ platform includes an intelligent color contrast system that automatically ensures text readability across all artist cards and themed components.

## Overview

The system automatically:
- Analyzes background colors for artist cards
- Calculates optimal text colors for maximum readability
- Ensures WCAG 2.1 AA compliance (4.5:1 contrast ratio minimum)
- Provides fallback colors when contrast is insufficient
- Adds text shadows and drop shadows for enhanced readability

## Key Components

### 1. Color Utilities (`lib/colorUtils.ts`)

Core functions for color analysis and contrast calculation:

```typescript
// Check if a color is light or dark
isColorLight(hex: string): boolean

// Calculate contrast ratio between two colors
getContrastRatio(color1: string, color2: string): number

// Get optimal text color for a background
getOptimalTextColor(backgroundColor: string): ColorResult

// Validate color accessibility
validateColorAccessibility(backgroundColor: string, textColor: string): ValidationResult
```

### 2. React Hooks (`hooks/useColorContrast.ts`)

Custom hooks for easy integration:

```typescript
// General color contrast hook
useColorContrast(options: UseColorContrastOptions): UseColorContrastReturn

// Specialized hook for artist cards
useArtistCardColors(artist: Artist, themeColor?: string): ColorResult

// Text contrast validation hook
useTextContrast(backgroundColor: string, textColor?: string): TextContrastResult
```

### 3. Artist Card Component

The `ArtistCard` component automatically uses the contrast system:

```typescript
export function ArtistCard({ artist, themeColor }: { artist: Artist; themeColor?: string }) {
  const { textColor, tagBg, shadowColor, contrastRatio, isAccessible } = useArtistCardColors(artist, themeColor);
  
  // Component automatically applies optimal colors
}
```

## Features

### Automatic Contrast Detection
- Tests multiple text colors (white, black, light gray, dark gray)
- Selects the color with the highest contrast ratio
- Ensures minimum 4.5:1 ratio for WCAG AA compliance

### Enhanced Readability
- Automatic text shadows for better visibility
- Drop shadows on cards for depth
- Semi-transparent tag backgrounds
- Opacity adjustments for secondary text

### Development Tools
- Console warnings for low contrast in development
- WCAG level reporting (AAA, AA, FAIL)
- Suggestions for improving contrast
- Demo component for testing color combinations

## Usage Examples

### Basic Artist Card
```typescript
import { ArtistCard } from '@/components/artists/ArtistCard';

<ArtistCard artist={artist} themeColor="#ff6b35" />
```

### Custom Color Analysis
```typescript
import { useColorContrast } from '@/hooks/useColorContrast';

const { textColor, tagBg, shadowColor, contrastRatio, isAccessible } = useColorContrast({
  backgroundColor: '#ff6b35',
  includeValidation: true
});
```

### Manual Validation
```typescript
import { validateColorAccessibility } from '@/lib/colorUtils';

const validation = validateColorAccessibility('#ff6b35', '#ffffff');
console.log(`WCAG Level: ${validation.wcagLevel}`);
```

## Color Result Object

```typescript
interface ColorResult {
  textColor: string;        // Optimal text color
  tagBg: string;           // Tag background color
  shadowColor: string;     // Shadow color for depth
  contrastRatio: number;   // Calculated contrast ratio
  isAccessible: boolean;   // Meets WCAG AA standards
  validation?: {           // Detailed validation info
    isValid: boolean;
    wcagLevel: 'AAA' | 'AA' | 'FAIL';
    suggestions: string[];
  };
}
```

## WCAG Compliance

The system ensures compliance with Web Content Accessibility Guidelines (WCAG) 2.1:

- **AAA Level**: 7:1 contrast ratio (for large text)
- **AA Level**: 4.5:1 contrast ratio (minimum requirement)
- **FAIL**: Below 4.5:1 (automatically corrected)

## Testing

Use the `ColorContrastDemo` component to test color combinations:

```typescript
import ColorContrastDemo from '@/components/ui/ColorContrastDemo';

// Add to any page for testing
<ColorContrastDemo />
```

## Best Practices

1. **Always use the hooks** instead of manual color calculations
2. **Test with various backgrounds** to ensure readability
3. **Monitor console warnings** in development for low contrast
4. **Consider user preferences** for high contrast modes
5. **Test with colorblind users** when possible

## Troubleshooting

### Low Contrast Warnings
If you see console warnings about low contrast:
1. Check the artist's theme color in Airtable
2. Verify the color is a valid hex code
3. Consider using a different theme color
4. The system will automatically correct to ensure accessibility

### Color Not Updating
1. Ensure the artist object has the correct `ThemePrimaryColor` field
2. Check that the component is re-rendering when props change
3. Verify the color format is valid (hex code)

## Future Enhancements

- Support for CSS custom properties
- High contrast mode detection
- Colorblind-friendly palette generation
- Advanced color harmony algorithms
- Real-time contrast monitoring 