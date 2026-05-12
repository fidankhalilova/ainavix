// Use a consistent ID type - string is more common with MongoDB/ObjectId
// If you need both, create a type alias
export type ID = string;

export interface User {
  _id: ID;
  id: ID; // alias for _id
  username: string;
  email: string;
  bio?: string;
  role: "user" | "admin";
  avatar?: { url: string | null; name: string | null };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: ID;
  id: ID;
  name: string;
  slug: string;
  description: string;
  color?: string;
}

export interface Feature {
  _id: ID;
  id: ID;
  name: string;
  description: string;
}

export interface Tag {
  _id: ID;
  id: ID;
  name: string;
}

export interface Tool {
  _id: ID;
  id: ID;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  website: string;
  pricing: "Free" | "Freemium" | "Paid" | "Enterprise";
  pricingDetails?: string;
  logo?: { url: string | null; name: string | null } | null;
  isVerified: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  viewsCount: number;
  averageRating: number;
  reviewsCount: number;
  categories: Category[];
  features: Feature[];
  tags: Tag[];
  submittedBy?: Partial<User>;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: ID;
  id: ID;
  rating: number;
  title?: string;
  content: string;
  pros?: string;
  cons?: string;
  tool?: Partial<Tool>;
  user?: Partial<User>;
  createdAt: string;
  updatedAt: string;
}

export interface ToolsQueryParams {
  search?: string;
  category?: string;
  pricing?: string;
  sort?: "newest" | "rating" | "popular" | "name";
  page?: number;
  pageSize?: number;
  featured?: boolean;
  ids?: string; // Should be string if it's a comma-separated list of IDs
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ToolsResponse {
  data: Tool[];
  meta: { pagination: PaginationMeta };
}
