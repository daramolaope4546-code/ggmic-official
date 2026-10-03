import { CORE_ART_RATIO, MENU_ART_RATIO } from '@/constants/assets';
import type { Announcement, AnnouncementCategory, AnnouncementCategoryMeta } from '@/types';

/**
 * Announcement categories. Stored as structured data so the UI only renders
 * labels/icons and a future admin/CMS can author against the same ids.
 */
export const ANNOUNCEMENT_CATEGORIES: AnnouncementCategoryMeta[] = [
  { id: 'general', label: 'General', icon: 'campaign' },
  { id: 'service', label: 'Services', icon: 'church' },
  { id: 'program', label: 'Programs', icon: 'event-available' },
  { id: 'event', label: 'Events', icon: 'event' },
  { id: 'important', label: 'Important', icon: 'priority-high' },
  { id: 'reminder', label: 'Reminders', icon: 'notifications-active' },
];

export const ANNOUNCEMENT_CATEGORY_MAP = ANNOUNCEMENT_CATEGORIES.reduce(
  (map, category) => {
    map[category.id] = category;
    return map;
  },
  {} as Record<AnnouncementCategory, AnnouncementCategoryMeta>,
);

/**
 * LOCAL DEMO DATA — Announcements preview.
 *
 * Every record is clearly sample content: titles begin with "Sample
 * Announcement" and no real GGMIC notice, biography or private detail is
 * presented. Artwork reuses the existing GGMIC section illustrations; the
 * confirmed main location is used only as a plausible placeholder venue.
 * Replace this array with the API/CMS feed in a later phase.
 */
export const DEMO_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'sample-welcome',
    title: 'Sample Announcement — Welcome to the GGMIC App',
    category: 'general',
    date: '2026-09-15',
    shortDescription:
      'Sample announcement content used to preview the announcements feed.',
    fullDescription:
      'Sample announcement content for the development preview. This demonstrates how a general announcement appears on the list and detail screens. Official notices will be supplied by the ministry and shown here once the announcements feed is connected.',
    image: require('../../assets/images/core-icons/announcement.png'),
    imageAspectRatio: CORE_ART_RATIO,
    isFeatured: true,
  },
  {
    id: 'sample-important-notice',
    title: 'Sample Announcement — Important Notice',
    category: 'important',
    date: '2026-09-16',
    shortDescription:
      'Sample important notice for the development preview.',
    fullDescription:
      'Sample important notice content for the development preview. Important notices are highlighted wherever announcements are shown. No real GGMIC information is presented here.',
    image: require('../../assets/images/menu/menu-notifications.png'),
    imageAspectRatio: MENU_ART_RATIO,
    isImportant: true,
  },
  {
    id: 'sample-sunday-service',
    title: 'Sample Announcement — Sunday Service Reminder',
    category: 'service',
    date: '2026-09-20',
    time: '8:00 AM',
    location: 'Main Branch — Behind Mechanic Village, Akure, Ondo State',
    shortDescription:
      'Sample service announcement for the development preview.',
    fullDescription:
      'Sample service announcement for the development preview, showing how a Sunday Service reminder with a time and venue appears. The time and location shown are the confirmed main-branch details used only as a placeholder.',
    image: require('../../assets/images/core-icons/sunday-service.png'),
    imageAspectRatio: CORE_ART_RATIO,
  },
  {
    id: 'sample-special-program',
    title: 'Sample Announcement — Special Programme',
    category: 'program',
    date: '2026-09-25',
    location: 'Main Branch — Behind Mechanic Village, Akure, Ondo State',
    shortDescription:
      'Sample programme announcement for the development preview.',
    fullDescription:
      'Sample programme announcement content for the development preview. Special programmes are grouped under this category so members can find them quickly once the feed is connected.',
    image: require('../../assets/images/menu/menu-ministries.png'),
    imageAspectRatio: MENU_ART_RATIO,
  },
  {
    id: 'sample-upcoming-event',
    title: 'Sample Announcement — Upcoming Event',
    category: 'event',
    date: '2026-10-01',
    startDate: '2026-10-01',
    endDate: '2026-10-03',
    location: 'Main Branch — Behind Mechanic Village, Akure, Ondo State',
    shortDescription:
      'Sample event notice showing an optional date range.',
    fullDescription:
      'Sample event notice for the development preview. It demonstrates how an announcement with a start and end date is displayed. Official event announcements will replace this content.',
    image: require('../../assets/images/core-icons/upcoming-event.png'),
    imageAspectRatio: CORE_ART_RATIO,
  },
  {
    id: 'sample-bible-study-reminder',
    title: 'Sample Announcement — Bible Study Reminder',
    category: 'reminder',
    date: '2026-09-28',
    time: '5:00 PM',
    shortDescription:
      'Sample reminder announcement for the development preview.',
    fullDescription:
      'Sample reminder announcement content for the development preview. Reminders are listed separately so time-sensitive messages stand out.',
    image: require('../../assets/images/core-icons/bible.png'),
    imageAspectRatio: CORE_ART_RATIO,
  },
];
