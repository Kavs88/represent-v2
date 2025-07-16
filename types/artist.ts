export interface Attachment {
  id: string;
  url: string;
  filename: string;
  size?: number;
  type?: string;
}

export interface Review {
  id: string;
  fields: {
    Artist: string[]; // Array of artist IDs
    "Client Name"?: string;
    "Review Text": string;
    "Project Type"?: string;
    Date: string;
    Featured?: boolean;
    Approved?: boolean;
  };
}

export interface Service {
  id: string;
  fields: {
    Name: string; // Service name
    Description?: string; // Service description
    "Price Range"?: string; // Price range as string (not date)
    Category?: string; // Service category
    "Artist ID": string[]; // Array of artist record IDs
    Featured?: boolean; // Whether the service is featured (Airtable checkbox)
    "Image URL"?: string; // Image URL for the service
  };
}

export interface Artist {
  id: string;
  fields: {
    Name: string;
    Speciality?: string;
    Bio?: string;
    ProfileImage?: Array<Attachment>;
    Artwork?: Array<Attachment>;
    SocialLinks?: string;
    Tags?: string[];
    Featured?: boolean;
    GeneratedBannerImage?: Array<Attachment>;
    ThemePrimaryColor?: string;
    ThemeBackgroundColor?: string;
    ThemeTextColor?: string;
    Location?: string; // Added location field
  };
} 