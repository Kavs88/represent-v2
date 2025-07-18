// lib/airtable.ts

import Airtable from "airtable";
import { z } from "zod";

// ==================================
// PERFORMANCE OPTIMIZATIONS
// ==================================

// In-memory cache for better performance
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache helper functions
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

// Rate limiting to prevent API abuse
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 100; // 100ms between requests

const throttleRequest = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => 
      setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
    );
  }
  
  lastRequestTime = Date.now();
};

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
    ThemeTextColor: z.string().optional()
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

// Service schema
export const serviceSchema = z.object({
  id: z.string(),
  fields: z.object({
    Name: z.string(),
    Description: z.string().optional(),
    "Price Range": z.string().optional(),
    Category: z.string().optional(),
    "Artist ID": z.array(z.string()),
    Featured: z.boolean().optional(),
    "Image URL": z.string().optional(),
  }),
});

export type Service = z.infer<typeof serviceSchema>;

// ==================================
// AIRTABLE CONFIG & FUNCTIONS
// ==================================

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);
const table = base("Artists");
const reviewsTable = base("Reviews");
const servicesTable = base("Services");

// ==================================
// Internal Record Processor (The Guard)
// Ensures all data matches our schema before being used.
// ==================================

const processRecords = (records: any[]): Artist[] => {
  const validated = z.array(artistSchema).safeParse(
    records.map(r => ({ id: r.id, fields: r.fields }))
  );
  if (!validated.success) {
    console.error("Zod Validation Error:", validated.error.flatten());
    return [];
  }
  return validated.data;
};

// ==================================
// Exported Data Fetching Functions
// ==================================

/**
 * Fetches all artists, or only featured artists.
 * Returns a clean, validated array of Artist objects.
 * Now includes caching for better performance.
 */
export const getArtists = async (options: { featuredOnly?: boolean } = {}): Promise<Artist[]> => {
  try {
    const cacheKey = `artists_${options.featuredOnly ? 'featured' : 'all'}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    await throttleRequest();
    
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
      sort: [{ field: "Name", direction: "asc" }],
      filterByFormula: options.featuredOnly ? "{Featured} = 1" : "",
    });
    
    const records = await query.all();
    let processed = processRecords([...records]);
    
    // For featured artists, shuffle the results to make selection more random
    if (options.featuredOnly && processed.length > 0) {
      // Fisher-Yates shuffle algorithm for true randomization
      for (let i = processed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [processed[i], processed[j]] = [processed[j], processed[i]];
      }
    }
    
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
 * Now includes caching for better performance.
 */
export const getArtistById = async (id: string): Promise<Artist | null> => {
  try {
    const cacheKey = `artist_${id}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    await throttleRequest();
    
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
 * Now includes caching for better performance.
 */
export const getAllTags = async (): Promise<string[]> => {
  try {
    const cacheKey = 'all_tags';
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    await throttleRequest();
    
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
 * Now includes caching for better performance.
 */
export const getArtistReviews = async (artistId: string): Promise<Review[]> => {
  try {
    const cacheKey = `reviews_${artistId}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    await throttleRequest();
    
    console.log(`Fetching reviews for artist ID: ${artistId}`);
    
    // First, let's get ALL records without specifying fields to see what field names exist
    const allReviewsQuery = reviewsTable.select();
    
    const allRecords = await allReviewsQuery.all();
    console.log(`Found ${allRecords.length} total reviews`);
    
    // Log each record to see what we have
    allRecords.forEach((record, index) => {
      console.log(`Review ${index + 1}:`, {
        id: record.id,
        fields: record.fields,
        artist: record.get("Artist"),
        text: record.get("Review Text"),
        date: record.get("Date"),
        featured: record.get("Featured"),
        approved: record.get("Approved")
      });
    });
    
    // Filter reviews that match the artist ID
    const filteredRecords = allRecords.filter(record => {
      const artistField = record.get("Artist");
      console.log(`Review ${record.id} artist field:`, artistField);
      return artistField && Array.isArray(artistField) && artistField.includes(artistId);
    });
    
    console.log(`Filtered to ${filteredRecords.length} reviews for artist ${artistId}`);
    
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
    
    console.log(`Returning ${reviews.length} reviews`);
    
    setCachedData(cacheKey, reviews);
    return reviews;
  } catch (error) {
    console.error('Airtable API error in getArtistReviews:', error);
    return [];
  }
};

/**
 * Batch fetch multiple artists by IDs for better performance
 */
export const getArtistsByIds = async (ids: string[]): Promise<Artist[]> => {
  try {
    if (ids.length === 0) return [];
    
    const cacheKey = `artists_batch_${ids.sort().join('_')}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    await throttleRequest();
    
    const filterFormula = ids.map(id => `RECORD_ID() = '${id}'`).join(' OR ');
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
      filterByFormula: `OR(${filterFormula})`,
    });
    
    const records = await query.all();
    const processed = processRecords([...records]);
    
    setCachedData(cacheKey, processed);
    return processed;
  } catch (error) {
    console.error("Airtable API error in getArtistsByIds:", error);
    return [];
  }
};

/**
 * Fetches featured services for a specific artist.
 * Returns only featured services for the given artist ID.
 * Now includes caching for better performance.
 */
export const getArtistFeaturedServices = async (artistId: string): Promise<Service[]> => {
  try {
    const cacheKey = `services_${artistId}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }
    await throttleRequest();
    
    console.log(`Fetching services for artist ID: ${artistId}`);
    
    // Fetch all services from Airtable
    const allServicesQuery = servicesTable.select();
    const allRecords = await allServicesQuery.all();
    console.log(`Found ${allRecords.length} total services`);
    
    // Log the first record to see all available field names
    if (allRecords.length > 0) {
      console.log('Available fields in Services table:', Object.keys(allRecords[0].fields));
      console.log('Sample service record fields:', allRecords[0].fields);
    }
    
    // Log each service record to see what we have
    allRecords.forEach((record, index) => {
      console.log(`Service ${index + 1}:`, {
        id: record.id,
        name: record.get("Name"),
        // Try different possible field names for artist relationship
        artistId: record.get("Artist ID"),
        artist: record.get("Artist"),
        artistName: record.get("Artist Name"),
        description: record.get("Description"),
        priceRange: record.get("Price Range"),
        category: record.get("Category")
      });
    });
    
    // Try different field names for the artist relationship
    const possibleArtistFields = ["Artist ID", "Artist", "Artist Name", "ArtistID"];
    let artistFieldName = null;
    let filteredRecords = [];
    
    for (const fieldName of possibleArtistFields) {
      const testFilter = allRecords.filter(record => {
        const artistField = record.get(fieldName);
        return artistField && (Array.isArray(artistField) ? artistField.includes(artistId) : artistField === artistId);
      });
      
      if (testFilter.length > 0) {
        artistFieldName = fieldName;
        filteredRecords = testFilter;
        console.log(`Found ${filteredRecords.length} services using field "${fieldName}"`);
        break;
      }
    }
    
    if (!artistFieldName) {
      console.log('No services found with any artist field. Available fields:', Object.keys(allRecords[0]?.fields || {}));
      return [];
    }
    
    console.log(`Using field "${artistFieldName}" for artist relationship`);
    console.log(`Filtered to ${filteredRecords.length} services for artist ${artistId}`);
    
    // Map to Service type, treating Price Range as string
    const services: Service[] = filteredRecords.map(record => {
      return {
        id: record.id,
        fields: {
          Name: record.get("Name") as string || "",
          Description: record.get("Description") as string || "",
          "Price Range": record.get("Price Range") as string || "",
          Category: record.get("Category") as string || "",
          "Artist ID": record.get(artistFieldName!) as string[] || [],
          Featured: record.get("Featured") as boolean || false,
          "Image URL": record.get("Image URL") as string || "",
        }
      };
    });
    console.log(`Returning ${services.length} services for artist ${artistId}:`, services);
    setCachedData(cacheKey, services);
    return services;
  } catch (error) {
    console.error('Airtable API error in getArtistFeaturedServices:', error);
    return [];
  }
};