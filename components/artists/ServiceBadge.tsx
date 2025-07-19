import { Service } from "@/lib/airtable";
import { motion } from "framer-motion";

interface ServiceBadgeProps {
  service: Service;
  themeColor?: string;
  textColor?: string;
}

// Icon mapping for different service categories and custom icons
const getServiceIcon = (category: string, name: string, customIcon?: string) => {
  // If there's a custom icon from Airtable, use it
  if (customIcon) {
    return (
      <div className="relative">
        <img 
          src={customIcon} 
          alt="" 
          className="w-4 h-4 object-contain"
          onError={(e) => {
            // Fallback to default icon if custom icon fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        {/* Fallback icon (hidden by default) */}
        <svg className="w-4 h-4 hidden" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      </div>
    );
  }
  const lowerCategory = category?.toLowerCase() || '';
  const lowerName = name?.toLowerCase() || '';
  
  // Category-based icons
  if (lowerCategory.includes('portrait') || lowerName.includes('portrait')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }
  
  if (lowerCategory.includes('landscape') || lowerName.includes('landscape')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  
  if (lowerCategory.includes('abstract') || lowerName.includes('abstract')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    );
  }
  
  if (lowerCategory.includes('digital') || lowerName.includes('digital')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  
  if (lowerCategory.includes('commission') || lowerName.includes('commission')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    );
  }
  
  if (lowerCategory.includes('custom') || lowerName.includes('custom')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    );
  }
  
  // Default art icon
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
    </svg>
  );
};

export default function ServiceBadge({ service, themeColor = '#00ff9d', textColor = '#E5E5E5' }: ServiceBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-2 px-4 py-3 rounded-full font-medium text-sm border transition-all duration-200 hover:shadow-lg cursor-pointer"
      style={{
        backgroundColor: `${themeColor}15`,
        color: textColor,
        borderColor: `${themeColor}40`,
      }}
    >
      {getServiceIcon(service.fields.Category || '', service.fields.Name, service.fields["Image URL"])}
      <span className="font-semibold">{service.fields.Name}</span>
      {service.fields["Price Range"] && (
        <span className="text-xs opacity-75 ml-1">
          • {service.fields["Price Range"]}
        </span>
      )}
    </motion.div>
  );
} 