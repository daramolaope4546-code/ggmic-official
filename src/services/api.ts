/**
 * Service layer placeholder.
 *
 * Phase 1 does not connect any backend. This module defines the typed boundary
 * the UI will eventually call so screens stay decoupled from data fetching.
 * Implementations will be added in a later phase when the API / PostgreSQL
 * store is available. No credentials, URLs, or secrets live here.
 */

const NOT_IMPLEMENTED = 'Not implemented in Phase 1 (no backend connected).';

export interface ApiResponse<T> {
  data: T;
}

/**
 * Future endpoint descriptors. These are intentionally unimplemented in Phase 1.
 */
export const api = {
  getServices: async (): Promise<ApiResponse<unknown>> => {
    throw new Error(NOT_IMPLEMENTED);
  },
  getSermons: async (): Promise<ApiResponse<unknown>> => {
    throw new Error(NOT_IMPLEMENTED);
  },
  getEvents: async (): Promise<ApiResponse<unknown>> => {
    throw new Error(NOT_IMPLEMENTED);
  },
  getAnnouncements: async (): Promise<ApiResponse<unknown>> => {
    throw new Error(NOT_IMPLEMENTED);
  },
};