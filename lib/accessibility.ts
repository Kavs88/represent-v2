// Accessibility utility functions

/**
 * Manages focus trap for modals and overlays
 */
export function createFocusTrap(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  firstElement?.focus();

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Announces status messages to screen readers
 */
export function announceStatus(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const region = document.getElementById(priority === 'assertive' ? 'status-messages' : 'aria-live-region');
  if (region) {
    region.textContent = message;
    // Clear the message after a short delay
    setTimeout(() => {
      region.textContent = '';
    }, 1000);
  }
}

/**
 * Manages focus when opening/closing modals
 */
export function manageModalFocus(modalElement: HTMLElement | null, isOpen: boolean): void {
  if (!modalElement) return;

  if (isOpen) {
    // Store the previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;
    modalElement.setAttribute('data-previously-focused', previouslyFocused?.id || '');
    
    // Focus the first focusable element in the modal
    const firstFocusable = modalElement.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    firstFocusable?.focus();
  } else {
    // Restore focus to the previously focused element
    const previouslyFocusedId = modalElement.getAttribute('data-previously-focused');
    if (previouslyFocusedId) {
      const previouslyFocused = document.getElementById(previouslyFocusedId);
      previouslyFocused?.focus();
    }
  }
}

/**
 * Handles keyboard navigation for custom components
 */
export function handleKeyboardNavigation(
  event: KeyboardEvent,
  options: {
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onSpace?: () => void;
  }
): void {
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      options.onEnter?.();
      break;
    case 'Escape':
      event.preventDefault();
      options.onEscape?.();
      break;
    case 'ArrowUp':
      event.preventDefault();
      options.onArrowUp?.();
      break;
    case 'ArrowDown':
      event.preventDefault();
      options.onArrowDown?.();
      break;
    case 'ArrowLeft':
      event.preventDefault();
      options.onArrowLeft?.();
      break;
    case 'ArrowRight':
      event.preventDefault();
      options.onArrowRight?.();
      break;
    case ' ':
      event.preventDefault();
      options.onSpace?.();
      break;
  }
}

/**
 * Generates accessible labels for interactive elements
 */
export function generateAccessibleLabel(
  baseLabel: string,
  context?: string,
  state?: string
): string {
  let label = baseLabel;
  if (context) label += ` - ${context}`;
  if (state) label += ` (${state})`;
  return label;
}

/**
 * Validates color contrast ratios for accessibility
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Checks if a color combination meets WCAG contrast requirements
 */
export function meetsContrastRequirements(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  
  const requirements = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 }
  };

  return ratio >= requirements[level][size];
} 