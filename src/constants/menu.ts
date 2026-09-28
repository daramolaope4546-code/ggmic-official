import type { MenuSection } from '@/types';

/**
 * Menu screen sections. Routes reference tab routes (/sermons, /bible,
 * /events) or the upcoming-feature placeholder stack routes.
 * Features not yet implemented will open their placeholder screen.
 */
export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'about',
    title: 'About',
    items: [
      { id: 'about-ggmic', label: 'About GGMIC', icon: 'info-outline', route: '/about' },
      { id: 'our-history', label: 'Our History', icon: 'history', route: '/history' },
      { id: 'mission', label: 'Mission', icon: 'flag', route: '/mission' },
      { id: 'vision', label: 'Vision', icon: 'visibility', route: '/vision' },
      { id: 'motto', label: 'Motto', icon: 'format-quote', route: '/motto' },
      { id: 'leadership', label: 'Leadership', icon: 'groups', route: '/leadership' },
      { id: 'founder', label: 'Founder', icon: 'account-box', route: '/founder' },
      { id: 'general-overseer', label: 'General Overseer', icon: 'account-circle', route: '/general-overseer' },
    ],
  },
  {
    id: 'ministry',
    title: 'Ministry',
    items: [
      { id: 'services', label: 'Services & Programs', icon: 'event-available', route: '/services' },
      { id: 'sermons', label: 'Sermons', icon: 'headphones', route: '/sermons' },
      { id: 'bible', label: 'Bible', icon: 'menu-book', route: '/bible' },
      { id: 'events', label: 'Events', icon: 'event', route: '/events' },
      { id: 'prayer-request', label: 'Prayer Request', icon: 'favorite', route: '/prayer' },
      { id: 'testimonies', label: 'Testimonies', icon: 'record-voice-over', route: '/testimonies' },
      { id: 'branches', label: 'Branches', icon: 'location-on', route: '/branches' },
    ],
  },
  {
    id: 'media',
    title: 'Media',
    items: [
      { id: 'videos', label: 'Videos', icon: 'ondemand-video', route: '/videos' },
      { id: 'gallery', label: 'Gallery', icon: 'photo-library', route: '/gallery' },
      { id: 'announcements', label: 'Announcements', icon: 'campaign', route: '/announcements' },
      { id: 'livestream', label: 'Livestream', icon: 'live-tv', route: '/livestream' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      { id: 'contact', label: 'Contact', icon: 'contact-phone', route: '/contact' },
      { id: 'settings', label: 'Settings', icon: 'settings', route: '/settings' },
    ],
  },
];