// Color utility functions for accessibility and contrast

// Enhanced utility to determine if a color is light or dark
export function isColorLight(hex: string): boolean {
  if (!hex) return false;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  // Enhanced perceived brightness calculation
  return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
}

// Calculate contrast ratio between two colors using WCAG 2.1 guidelines
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const r = parseInt(c.substr(0, 2), 16) / 255;
    const g = parseInt(c.substr(2, 2), 16) / 255;
    const b = parseInt(c.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      if (c <= 0.03928) return c / 12.92;
      return Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

// Get optimal text color for a background with accessibility compliance
export function getOptimalTextColor(backgroundColor: string): { 
  textColor: string; 
  tagBg: string; 
  shadowColor: string;
  contrastRatio: number;
  isAccessible: boolean;
} {
  if (!backgroundColor) {
    return { 
      textColor: '#ffffff', 
      tagBg: 'rgba(255,255,255,0.18)', 
      shadowColor: 'rgba(0,0,0,0.1)',
      contrastRatio: 21, // white on transparent
      isAccessible: true
    };
  }
  
  // Test colors for best contrast
  const testColors = [
    '#ffffff', // white
    '#000000', // black
    '#f8f9fa', // light gray
    '#212529', // dark gray
    '#ffffff', // pure white
    '#000000', // pure black
  ];
  
  let bestContrast = 0;
  let bestColor = '#ffffff';
  
  testColors.forEach(color => {
    const contrast = getContrastRatio(backgroundColor, color);
    if (contrast > bestContrast) {
      bestContrast = contrast;
      bestColor = color;
    }
  });
  
  // Ensure minimum contrast ratio of 4.5:1 for accessibility (WCAG AA)
  let isAccessible = bestContrast >= 4.5;
  if (!isAccessible) {
    // If contrast is too low, force high contrast
    const isLight = isColorLight(backgroundColor);
    bestColor = isLight ? '#000000' : '#ffffff';
    bestContrast = getContrastRatio(backgroundColor, bestColor);
    isAccessible = bestContrast >= 4.5;
  }
  
  // Determine tag background and shadow colors
  const isLightText = bestColor === '#ffffff' || bestColor === '#f8f9fa';
  const tagBg = isLightText ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.08)';
  const shadowColor = isLightText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
  
  return { 
    textColor: bestColor, 
    tagBg, 
    shadowColor, 
    contrastRatio: bestContrast,
    isAccessible
  };
}

// Validate if a color combination meets accessibility standards
export function validateColorAccessibility(backgroundColor: string, textColor: string): {
  isValid: boolean;
  contrastRatio: number;
  wcagLevel: 'AAA' | 'AA' | 'FAIL';
  suggestions: string[];
} {
  const contrastRatio = getContrastRatio(backgroundColor, textColor);
  
  let wcagLevel: 'AAA' | 'AA' | 'FAIL';
  let suggestions: string[] = [];
  
  if (contrastRatio >= 7) {
    wcagLevel = 'AAA';
  } else if (contrastRatio >= 4.5) {
    wcagLevel = 'AA';
  } else {
    wcagLevel = 'FAIL';
    suggestions.push('Consider using a higher contrast color combination');
    suggestions.push('Try white text on dark backgrounds or black text on light backgrounds');
  }
  
  return {
    isValid: wcagLevel !== 'FAIL',
    contrastRatio,
    wcagLevel,
    suggestions
  };
}

// Generate accessible color palette for a given base color
export function generateAccessiblePalette(baseColor: string): {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
} {
  const isLight = isColorLight(baseColor);
  
  return {
    primary: baseColor,
    secondary: isLight ? '#000000' : '#ffffff',
    accent: isLight ? '#ff6b35' : '#00ff9d',
    text: isLight ? '#000000' : '#ffffff',
    background: isLight ? '#ffffff' : '#000000'
  };
} 