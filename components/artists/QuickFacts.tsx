import { Artist } from "@/types/artist";
import { QuickFact } from "@/lib/airtable";
import { motion } from "framer-motion";

interface QuickFactsProps {
  artist: Artist;
  quickFacts: QuickFact[];
  themeColor?: string;
  textColor?: string;
}

export default function QuickFacts({ artist, quickFacts, themeColor = '#00ff9d', textColor = '#E5E5E5' }: QuickFactsProps) {
  // Default facts if no Airtable data is available
  const defaultFacts = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
      label: "Experience",
      value: "Professional Artist",
      color: themeColor
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Status",
      value: "Available for Commissions",
      color: themeColor
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Location",
      value: "Worldwide",
      color: themeColor
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Response Time",
      value: "Within 24 hours",
      color: themeColor
    }
  ];

  // Use Airtable data if available, otherwise use defaults
  const facts = quickFacts && quickFacts.length > 0 
    ? quickFacts.map(fact => ({
        icon: fact.fields.Icon ? (
          <img 
            src={fact.fields.Icon} 
            alt="" 
            className="w-5 h-5 object-contain"
            onError={(e) => {
              // Fallback to default icon if custom icon fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
        ) : getDefaultIcon(fact.fields["Fact Type"]),
        label: fact.fields["Fact Type"],
        value: fact.fields["Fact Value"],
        color: themeColor
      }))
    : defaultFacts;

  // Helper function to get default icons based on fact type
  function getDefaultIcon(factType: string) {
    const lowerType = factType?.toLowerCase() || '';
    
    if (lowerType.includes('experience') || lowerType.includes('years')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      );
    }
    
    if (lowerType.includes('status') || lowerType.includes('available')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    
    if (lowerType.includes('location') || lowerType.includes('country')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    }
    
    if (lowerType.includes('response') || lowerType.includes('time')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    
    // Default icon
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
    >
      {facts.map((fact, index) => (
        <motion.div
          key={fact.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          className="flex flex-col items-center text-center p-4 rounded-lg border transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: `${themeColor}10`,
            borderColor: `${themeColor}30`,
            color: textColor
          }}
        >
          <div 
            className="mb-2 p-2 rounded-full"
            style={{ backgroundColor: `${fact.color}20` }}
          >
            <div style={{ color: fact.color }}>
              {fact.icon}
            </div>
          </div>
          <span className="text-xs font-medium opacity-75 mb-1">{fact.label}</span>
          <span className="text-sm font-semibold">{fact.value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
} 