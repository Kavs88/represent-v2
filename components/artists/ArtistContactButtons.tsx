import { FaEnvelope, FaPhone, FaGlobe, FaInstagram, FaTwitter } from 'react-icons/fa';

interface ArtistContactButtonsProps {
  artist: {
    fields: {
      Email?: string;
      Phone?: string;
      Website?: string;
      Instagram?: string;
      Twitter?: string;
    };
  };
  themeColor?: string;
}

export function ArtistContactButtons({ artist, themeColor }: ArtistContactButtonsProps) {
  const { Email, Phone, Website, Instagram, Twitter } = artist.fields;

  const contactMethods = [
    { icon: FaEnvelope, href: Email ? `mailto:${Email}` : null, label: 'Email' },
    { icon: FaPhone, href: Phone ? `tel:${Phone}` : null, label: 'Phone' },
    { icon: FaGlobe, href: Website || null, label: 'Website' },
    { icon: FaInstagram, href: Instagram ? `https://instagram.com/${Instagram}` : null, label: 'Instagram' },
    { icon: FaTwitter, href: Twitter ? `https://twitter.com/${Twitter}` : null, label: 'Twitter' },
  ].filter(method => method.href);

  if (contactMethods.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted text-sm">No contact information available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {contactMethods.map((method, index) => (
        <a
          key={index}
          href={method.href!}
          target="_blank"
          rel="noopener noreferrer"
          style={themeColor ? { backgroundColor: themeColor, color: '#000' } : {}}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
          title={method.label}
          aria-label={`${method.label} - opens in new tab`}
        >
          <method.icon className="w-4 h-4" />
          <span className="text-sm font-medium">{method.label}</span>
        </a>
      ))}
    </div>
  );
} 