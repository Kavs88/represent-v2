export interface Attachment {
  id: string;
  url: string;
  filename: string;
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
  };
} 