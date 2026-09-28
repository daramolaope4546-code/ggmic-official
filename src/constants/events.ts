import type { ChurchEvent } from '@/types';

/**
 * LOCAL DEMO DATA — Events preview.
 *
 * All event records are clearly sample content. Dates are set around
 * September 2026 to demonstrate upcoming/past event sorting. Event titles
 * include the word "Sample" to make the demo nature obvious. No invented
 * latitude/longitude, registration URLs or images are included.
 *
 * The main location (Behind Mechanic Village, Akure, Ondo State) is the
 * confirmed GGMIC main branch used here as a plausible placeholder venue.
 */

// ── Upcoming (on or after today: 15 Sep 2026) ──────────────────────────────

const UPCOMING_EVENTS: ChurchEvent[] = [
  {
    id: 'sample-prayer-retreat',
    title: 'Sample Event — Prayer Retreat',
    date: '2026-09-30',
    time: '8:00 AM',
    endTime: '4:00 PM',
    location: 'Main Branch — Behind Mechanic Village, Akure, Ondo State',
    category: 'Prayer',
    description:
      'Sample event content for the development preview. This demonstrates how upcoming events appear on the Events home and in search results.',
  },
  {
    id: 'sample-thanksgiving',
    title: 'Sample Event — Thanksgiving Service',
    date: '2026-10-17',
    time: '8:00 AM',
    endTime: '10:30 AM',
    location: 'Main Branch — Behind Mechanic Village, Akure, Ondo State',
    category: 'Worship',
    description:
      'Sample event content for the development preview. Official event details will be supplied by the ministry.',
  },
  {
    id: 'sample-family-worship',
    title: 'Sample Event — Family Worship Day',
    date: '2026-11-08',
    time: '9:00 AM',
    endTime: '12:00 PM',
    location: 'Main Branch — Behind Mechanic Village, Akure, Ondo State',
    category: 'Worship',
    description:
      'Sample event content for the development preview. No real event details are presented.',
  },
];

// ── Past (before today: 15 Sep 2026) ───────────────────────────────────────

const PAST_EVENTS: ChurchEvent[] = [
  {
    id: 'sample-anniversary',
    title: 'Sample Event — Anniversary Service',
    date: '2026-08-21',
    time: '8:00 AM',
    endTime: '11:00 AM',
    location: 'Main Branch — Behind Mechanic Village, Akure, Ondo State',
    category: 'Celebration',
    description:
      'Sample past event content for the development preview.',
  },
  {
    id: 'sample-outreach',
    title: 'Sample Event — Outreach Programme',
    date: '2026-07-12',
    time: '9:00 AM',
    endTime: '2:00 PM',
    location: 'Main Branch — Behind Mechanic Village, Akure, Ondo State',
    category: 'Community',
    description:
      'Sample past event content for the development preview.',
  },
  {
    id: 'sample-leadership-summit',
    title: 'Sample Event — Leadership Summit',
    date: '2026-06-06',
    time: '10:00 AM',
    endTime: '3:00 PM',
    location: 'Main Branch — Behind Mechanic Village, Akure, Ondo State',
    category: 'Leadership',
    description:
      'Sample past event content for the development preview.',
  },
];

export const DEMO_EVENTS: ChurchEvent[] = [...UPCOMING_EVENTS, ...PAST_EVENTS];

export const EVENT_CATEGORIES: string[] = [
  'Prayer',
  'Worship',
  'Community',
  'Celebration',
  'Leadership',
];
