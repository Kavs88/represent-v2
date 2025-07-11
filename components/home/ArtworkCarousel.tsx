"use client";
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Attachment } from '@/types/artist';

export default function ArtworkCarousel({ artworks }: { artworks: Attachment[] }) {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps'
  }, [
    Autoplay({ 
      delay: 4000, // Slightly longer delay for better UX
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true
    })
  ]);

  if (!artworks || artworks.length === 0) return null;

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {artworks.map((artwork, index) => (
          <div className="relative flex-grow-0 flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3 p-4" key={artwork.id}>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border-4" style={{ borderColor: '#17624A' }}>
              <Image
                src={artwork.url}
                alt={artwork.filename || 'Artwork'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={index < 2 ? "eager" : "lazy"} // Load first 2 images eagerly
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                onLoad={(e) => {
                  // Smooth image loading
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '1';
                }}
                style={{ 
                  opacity: 0, 
                  transition: 'opacity 0.4s ease-in-out',
                  willChange: 'opacity'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 