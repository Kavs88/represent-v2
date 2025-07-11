"use client";

import { Review } from '@/types/artist';
import { motion } from 'framer-motion';

interface ReviewCardProps {
  review: Review;
  themePrimaryColor?: string;
  themeBackgroundColor?: string;
  themeTextColor?: string;
}

export default function ReviewCard({ 
  review, 
  themePrimaryColor = '#00ff9d',
  themeBackgroundColor = '#0E0E0E',
  themeTextColor = '#E5E5E5'
}: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative overflow-hidden rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl"
      style={{
        backgroundColor: themeBackgroundColor ? `${themeBackgroundColor}15` : 'rgba(14, 14, 14, 0.15)',
        border: `1px solid ${themePrimaryColor ? `${themePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)'}`,
        color: themeTextColor,
        boxShadow: `0 8px 32px ${themePrimaryColor ? `${themePrimaryColor}10` : 'rgba(0, 255, 157, 0.1)'}`,
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${themePrimaryColor}05 0%, transparent 50%, ${themePrimaryColor}02 100%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex-1 space-y-2 sm:space-y-3">
            {/* Featured badge */}
            {review.fields.Featured && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-full tracking-wide"
                style={{
                  backgroundColor: themePrimaryColor ? `${themePrimaryColor}25` : 'rgba(0, 255, 157, 0.25)',
                  color: themePrimaryColor,
                  border: `1px solid ${themePrimaryColor}40`
                }}
              >
                <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full mr-1.5 sm:mr-2" style={{ backgroundColor: themePrimaryColor }} />
                Featured Review
              </motion.span>
            )}
            
            {/* Client name */}
            {review.fields["Client Name"] && (
              <motion.h4 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg font-semibold tracking-tight"
                style={{ color: themePrimaryColor }}
              >
                {review.fields["Client Name"].trim()}
              </motion.h4>
            )}
            
            {/* Project type */}
            {review.fields["Project Type"] && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xs sm:text-sm font-medium opacity-80 tracking-wide"
              >
                {review.fields["Project Type"]}
              </motion.p>
            )}
          </div>
          
          {/* Date */}
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xs font-medium opacity-60 tracking-wide whitespace-nowrap self-start sm:self-auto"
          >
            {formatDate(review.fields.Date)}
          </motion.span>
        </div>

        {/* Review Text */}
        <motion.blockquote 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          {/* Quote mark */}
          <span 
            className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 text-2xl sm:text-3xl lg:text-4xl font-serif opacity-20"
            style={{ color: themePrimaryColor }}
          >
            "
          </span>
          
          <p className="text-sm sm:text-base leading-relaxed font-light tracking-wide pl-4 sm:pl-6">
            {review.fields["Review Text"]}
          </p>
        </motion.blockquote>
      </div>
      
      {/* Subtle border accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: themePrimaryColor }}
      />
    </motion.div>
  );
} 