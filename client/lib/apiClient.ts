/**
 * apiClient.ts — static-mode stub
 *
 * All data is served from in-memory store (db/store.ts).
 * No HTTP calls, no axios — this file only exports the
 * getStrapiMedia helper used by components to resolve logo URLs.
 */

/**
 * Resolve a media URL. In static mode all logos are null,
 * so this simply returns null or the URL as-is if one is provided.
 */
export const getStrapiMedia = (url: string | null | undefined): string | null => {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('blob:')) return url;
  return url;
};

export default null;
