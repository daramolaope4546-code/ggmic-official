import { DEMO_ANNOUNCEMENTS } from '@/constants/announcements';
import type { Announcement, AnnouncementCategory } from '@/types';

function sortByDateDesc(a: Announcement, b: Announcement): number {
  return b.date.localeCompare(a.date);
}

// ── Queries ─────────────────────────────────────────────────────────────────

/** All announcements, newest first. */
export function getAnnouncements(): Announcement[] {
  return [...DEMO_ANNOUNCEMENTS].sort(sortByDateDesc);
}

/** The single announcement pinned to the featured slot, if one is marked. */
export function getFeaturedAnnouncement(): Announcement | undefined {
  return getAnnouncements().find((announcement) => announcement.isFeatured);
}

export function getAnnouncement(id: string): Announcement | undefined {
  return DEMO_ANNOUNCEMENTS.find((announcement) => announcement.id === id);
}

/** Announcements in a category, or all of them when `category` is null. */
export function filterAnnouncements(category: AnnouncementCategory | null): Announcement[] {
  const all = getAnnouncements();
  return category ? all.filter((announcement) => announcement.category === category) : all;
}

/** The most recent announcements for the compact Home section. */
export function getLatestAnnouncements(limit = 2): Announcement[] {
  return getAnnouncements().slice(0, limit);
}
