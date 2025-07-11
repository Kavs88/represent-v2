import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Represent+',
  description: 'Discover Represent+, the premier platform connecting exceptional creative talent with opportunities worldwide. Learn about our mission, values, and commitment to artistic excellence.',
  openGraph: {
    title: 'About Us | Represent+',
    description: 'Discover Represent+, the premier platform connecting exceptional creative talent with opportunities worldwide.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 