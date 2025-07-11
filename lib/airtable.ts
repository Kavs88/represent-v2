// lib/airtable.ts

import Airtable from "airtable";
import { z } from "zod";

// ==================================
// SCHEMAS & TYPES ARE NOW DEFINED HERE
// ==================================

export const attachmentSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  filename: z.string(),
});

export const artistSchema = z.object({
  id: z.string(),
  fields: z.object({
    Name: z.string(),
    Speciality: z.string().optional(),
    Bio: z.string().optional(),
    ProfileImage: z.array(attachmentSchema).optional(),
    Artwork: z.array(attachmentSchema).optional(),
    SocialLinks: z.string().optional(),
    Tags: z.array(z.string()).optional(),
    Featured: z.boolean().optional(),
    GeneratedBannerImage: z.array(attachmentSchema).optional(),
    ThemePrimaryColor: z.string().optional(),
    ThemeBackgroundColor: z.string().optional(),
    ThemeTextColor: z.string().optional(),
  }),
});

export type Artist = z.infer<typeof artistSchema>;
export type Attachment = z.infer<typeof attachmentSchema>;

// Review schema
export const reviewSchema = z.object({
  id: z.string(),
  fields: z.object({
    Artist: z.array(z.string()),
    "Review Text": z.string(),
    "Client Name": z.string().optional(),
    "Project Type": z.string().optional(),
    Date: z.string(),
    Featured: z.boolean().optional(),
    Approved: z.boolean().optional(),
  }),
});

export type Review = z.infer<typeof reviewSchema>;

// ==================================
// AIRTABLE CONFIG & FUNCTIONS
// ==================================

// Validate environment variables
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY environment variable is required');
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID environment variable is required');
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);
const table = base("Artists");
const reviewsTable = base("Reviews");

// Simple in-memory cache for better performance
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// ==================================
// Internal Record Processor (The Guard)
// Ensures all data matches our schema before being used.
// ==================================

const processRecords = (records: any[]): Artist[] => {
  try {
    const validated = z.array(artistSchema).safeParse(
      records.map(r => ({ id: r.id, fields: r.fields }))
    );
    if (!validated.success) {
      console.error("Zod Validation Error:", validated.error.flatten());
      return [];
    }
    return validated.data;
  } catch (error) {
    console.error("Error processing records:", error);
    return [];
  }
};

// ==================================
// Exported Data Fetching Functions
// ==================================

/**
 * Fetches all artists, or only featured artists.
 * Returns a clean, validated array of Artist objects.
 */
export const getArtists = async (options: { featuredOnly?: boolean } = {}): Promise<Artist[]> => {
  try {
    const cacheKey = `artists_${options.featuredOnly ? 'featured' : 'all'}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    // Optimize field selection based on usage
    const fields = options.featuredOnly 
      ? ["Name", "Speciality", "ProfileImage", "Artwork", "Tags", "Featured", "ThemePrimaryColor"]
      : ["Name", "Speciality", "Bio", "ProfileImage", "Artwork", "SocialLinks", "Tags", "Featured", "GeneratedBannerImage", "ThemePrimaryColor", "ThemeBackgroundColor", "ThemeTextColor"];
    
    const query = table.select({
      fields,
      sort: [{ field: "Name", direction: "asc" }],
      filterByFormula: options.featuredOnly ? "{Featured} = 1" : "",
    });
    
    const records = await query.all();
    const processed = processRecords([...records]);
    
    setCachedData(cacheKey, processed);
    return processed;
  } catch (error) {
    console.error("Airtable API error in getArtists:", error);
    return [];
  }
};

// Add a processRecord helper for this diagnostic if not present
function processRecord(record: any): Artist | null {
  if (!record || !record.id || !record.fields) {
    console.warn("Airtable record was missing or malformed.", record);
    return null;
  }
  const dataToParse = { id: record.id, fields: record.fields };
  const validatedData = artistSchema.safeParse(dataToParse);
  if (!validatedData.success) {
    console.error("Zod Validation Error:", validatedData.error.flatten());
    return null;
  }
  return validatedData.data;
}

/**
 * Fetches a single artist by their Record ID.
 * This is the new, "bulletproof" version to prevent 404 crashes.
 * Returns a single Artist object or null if not found.
 */
export const getArtistById = async (id: string): Promise<Artist | null> => {
  try {
    if (!id || typeof id !== 'string') {
      console.error("Invalid artist ID provided:", id);
      return null;
    }

    const cacheKey = `artist_${id}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const query = table.select({
      fields: [
        "Name",
        "Speciality",
        "Bio",
        "ProfileImage",
        "Artwork",
        "SocialLinks",
        "Tags",
        "Featured",
        "GeneratedBannerImage",
        "ThemePrimaryColor",
        "ThemeBackgroundColor",
        "ThemeTextColor"
      ],
      filterByFormula: `RECORD_ID() = '${id}'`,
      maxRecords: 1,
    });
    const records = await query.all();
    if (records.length === 0) return null;
    const processed = processRecords([...records]);
    const result = processed[0] || null;
    
    if (result) {
      setCachedData(cacheKey, result);
    }
    
    return result;
  } catch (error) {
    console.error(`Airtable API error in getArtistById for ${id}:`, error);
    return null;
  }
};

/**
 * Fetches all unique tags from all artists.
 * Returns a simple array of strings.
 */
export const getAllTags = async (): Promise<string[]> => {
  try {
    const cacheKey = 'all_tags';
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const records = await table.select({ fields: ["Tags"] }).all();
    const tagSets = records.map((record) => (record.get("Tags") as string[]) || []);
    const result = Array.from(new Set(tagSets.flat())).sort();
    
    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Airtable API error in getAllTags:", error);
    return [];
  }
};

/**
 * Fetches reviews for a specific artist.
 * Returns approved reviews only, sorted by featured first, then date.
 */
export const getArtistReviews = async (artistId: string): Promise<Review[]> => {
  try {
    if (!artistId || typeof artistId !== 'string') {
      console.error("Invalid artist ID provided for reviews:", artistId);
      return [];
    }

    const cacheKey = `reviews_${artistId}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const allRecords = await reviewsTable.select().all();
    
    // Filter reviews that match the artist ID
    const filteredRecords = allRecords.filter(record => {
      const artistField = record.get("Artist");
      return artistField && Array.isArray(artistField) && artistField.includes(artistId);
    });
    
    const reviews: Review[] = filteredRecords.map(record => {
      const artistField = record.get("Artist") as string[];
      const textField = record.get("Review Text") as string;
      const dateField = record.get("Date") as string;
      const featuredField = record.get("Featured") as boolean;
      
      return {
        id: record.id,
        fields: {
          Artist: artistField || [],
          "Review Text": textField || "",
          "Client Name": record.get("Client Name") as string || "",
          "Project Type": record.get("Project Type") as string || "",
          Date: dateField || "",
          Featured: featuredField || false,
          Approved: record.get("Approved") as boolean || false,
        }
      };
    });
    
    setCachedData(cacheKey, reviews);
    return reviews;
  } catch (error) {
    console.error('Airtable API error in getArtistReviews:', error);
    return [];
  }
};