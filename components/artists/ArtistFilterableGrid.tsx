"use client";

import React, { useState, useMemo } from 'react';
import { Artist } from '@/types/artist';
import { ArtistCard } from './ArtistCard';

export default function ArtistFilterableGrid({ artists, allTags }: { artists: Artist[], allTags: string[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const nameMatch = artist.fields.Name.toLowerCase().includes(searchTerm.toLowerCase());
      const tagMatch = selectedTags.length === 0 || selectedTags.every(tag => artist.fields.Tags?.includes(tag));
      return nameMatch && tagMatch;
    });
  }, [searchTerm, selectedTags, artists]);

  return (
    <div>
      {/* Search and Filter UI here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredArtists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
      </div>
    </div>
  );
} 