// Cache configuration times in milliseconds for React Query
export const CACHE_TIMES = {
  TABLE_DATA: 15 * 60 * 1000,          // 15 minutes for table data (lists, paginated tables)
  DYNAMIC_OPTIONS: 60 * 60 * 1000,      // 60 minutes for dropdowns, select options, static/dynamic listings
  BY_ID: 30 * 60 * 1000,                // 30 minutes for single resource details fetched by ID
  AUTH: 0,                              // 0 seconds (no cache) for authentication-related API calls
};
