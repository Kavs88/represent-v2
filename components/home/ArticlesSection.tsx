"use client";
import Image from 'next/image';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/rp_article1/600/400',
    category: 'Press',
    title: 'Represent+ Featured in Art Magazine',
    description: 'Our platform was recently highlighted for its innovative approach to artist representation.',
    link: '#',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/rp_article2/600/400',
    category: 'Interview',
    title: 'Interview with Founder',
    description: 'A candid conversation with our founder about the future of creative talent.',
    link: '#',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/rp_article3/600/400',
    category: 'Press',
    title: 'Gallery Partnership Announced',
    description: 'Represent+ partners with leading galleries to expand opportunities for artists.',
    link: '#',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/rp_article4/600/400',
    category: 'Feature',
    title: 'Artist Success Story',
    description: 'How one artist leveraged Represent+ to launch an international career.',
    link: '#',
  },
];

export default function ArticlesSection() {
  return (
    <section className="py-24" style={{ background: '#23272a' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black mb-12 text-center">Articles & Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col border-4" style={{ borderColor: '#17624A' }}>
              <div className="relative w-full aspect-video">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col p-6">
                <span className="inline-block bg-primary/20 text-primary text-xs font-bold uppercase px-3 py-1 rounded-full mb-3 w-fit">{article.category}</span>
                <h3 className="text-lg font-bold mb-2 text-foreground">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{article.description}</p>
                <Link href={article.link} className="text-primary font-semibold text-sm hover:underline mt-auto">Read More &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 