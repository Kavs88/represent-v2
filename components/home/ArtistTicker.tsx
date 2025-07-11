"use client";
import React, { useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { Artist } from '@/types/artist';

interface ArtistTickerProps {
  artists: Artist[];
}

export default function ArtistTicker({ artists }: ArtistTickerProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      dragFree: true,
      breakpoints: {
        '(min-width: 1280px)': { slidesToScroll: 1 },
      },
    },
    [Autoplay({ delay: 2500, stopOnInteraction: false })]
  );

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex gap-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="min-w-[260px] max-w-xs flex-shrink-0"
            style={{ width: "20vw", minWidth: 260, maxWidth: 320 }}
          >
            <ArtistCard artist={artist} themeColor={artist.fields.ThemePrimaryColor} />
          </div>
        ))}
      </div>
    </div>
  );
} 