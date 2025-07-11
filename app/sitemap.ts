import { MetadataRoute } from 'next'
import { getArtists } from '@/lib/airtable'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://representgpt.com'
  
  // Get all artists for dynamic routes
  const artists = await getArtists({ featuredOnly: false })
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/artists`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic artist pages
  const artistPages = artists.map((artist) => ({
    url: `${baseUrl}/artists/${artist.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...artistPages]
} 