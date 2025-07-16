"use client";

import { useState } from 'react';
import { useColorContrast } from '@/hooks/useColorContrast';
import { validateColorAccessibility } from '@/lib/colorUtils';

export default function ColorContrastDemo() {
  const [backgroundColor, setBackgroundColor] = useState('#ff6b35');
  const [customTextColor, setCustomTextColor] = useState('');
  
  const { textColor, tagBg, shadowColor, contrastRatio, isAccessible, validation } = useColorContrast({
    backgroundColor,
    includeValidation: true
  });

  const customValidation = customTextColor 
    ? validateColorAccessibility(backgroundColor, customTextColor)
    : null;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Color Contrast Demo</h2>
      
      {/* Color Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Background Color:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-full h-12 rounded border"
          />
          <input
            type="text"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            placeholder="#ff6b35"
            className="mt-2 w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Custom Text Color (optional):</label>
          <input
            type="color"
            value={customTextColor}
            onChange={(e) => setCustomTextColor(e.target.value)}
            className="w-full h-12 rounded border"
          />
          <input
            type="text"
            value={customTextColor}
            onChange={(e) => setCustomTextColor(e.target.value)}
            placeholder="#ffffff"
            className="mt-2 w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      {/* Demo Card */}
      <div 
        className="p-6 rounded-lg border-2"
        style={{ 
          backgroundColor,
          boxShadow: `0 4px 6px -1px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`
        }}
      >
        <h3 
          className="text-xl font-bold mb-2"
          style={{ color: textColor }}
        >
          Sample Text with Optimal Contrast
        </h3>
        <p 
          className="text-sm mb-4"
          style={{ color: textColor, opacity: 0.8 }}
        >
          This text automatically adjusts for optimal readability.
        </p>
        <span 
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{ background: tagBg, color: textColor }}
        >
          Sample Tag
        </span>
      </div>

      {/* Custom Text Demo */}
      {customTextColor && (
        <div 
          className="p-6 rounded-lg border-2"
          style={{ backgroundColor }}
        >
          <h3 
            className="text-xl font-bold mb-2"
            style={{ color: customTextColor }}
          >
            Custom Text Color
          </h3>
          <p 
            className="text-sm"
            style={{ color: customTextColor, opacity: 0.8 }}
          >
            This uses your custom text color.
          </p>
        </div>
      )}

      {/* Contrast Information */}
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold mb-2">Optimal Color Results:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Text Color:</strong> {textColor}</li>
            <li><strong>Tag Background:</strong> {tagBg}</li>
            <li><strong>Shadow Color:</strong> {shadowColor}</li>
            <li><strong>Contrast Ratio:</strong> {contrastRatio.toFixed(2)}:1</li>
            <li><strong>Accessible:</strong> {isAccessible ? '✅ Yes' : '❌ No'}</li>
            {validation && (
              <li><strong>WCAG Level:</strong> {validation.wcagLevel}</li>
            )}
          </ul>
        </div>

        {customValidation && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="font-semibold mb-2">Custom Color Validation:</h4>
            <ul className="text-sm space-y-1">
              <li><strong>Text Color:</strong> {customTextColor}</li>
              <li><strong>Contrast Ratio:</strong> {customValidation.contrastRatio.toFixed(2)}:1</li>
              <li><strong>Valid:</strong> {customValidation.isValid ? '✅ Yes' : '❌ No'}</li>
              <li><strong>WCAG Level:</strong> {customValidation.wcagLevel}</li>
              {customValidation.suggestions.length > 0 && (
                <li>
                  <strong>Suggestions:</strong>
                  <ul className="ml-4 mt-1">
                    {customValidation.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-xs">• {suggestion}</li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 