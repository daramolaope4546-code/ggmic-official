import type { Announcement, ChurchEvent, Sermon } from '@/types';

/**
 * MOCK DATA - Phase 1 demonstration only.
 *
 * No backend is connected in Phase 1. Arrays are intentionally empty so the UI
 * renders honest empty states instead of fabricating church content. When the
 * backend arrives these modules will be replaced by API-derived data.
 */
export const MOCK_LATEST_SERMON: Sermon[] = [];

export const MOCK_UPCOMING_EVENTS: ChurchEvent[] = [];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [];