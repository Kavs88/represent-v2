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
];

export default function ArticlesSection() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black mb-8 text-center text-white drop-shadow-lg">Articles & Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {articles.map((article) => (
            <div key={article.id} className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden flex flex-col border-2 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300">
              <div className="relative w-full aspect-video">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col p-4">
                <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3 w-fit">{article.category}</span>
                <h3 className="text-base font-bold mb-2 text-white">{article.title}</h3>
                <p className="text-xs text-white/70 mb-3 flex-1">{article.description}</p>
                <Link href={article.link} className="text-orange-400 font-semibold text-sm hover:text-orange-300 hover:underline mt-auto transition-colors">Read More &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 