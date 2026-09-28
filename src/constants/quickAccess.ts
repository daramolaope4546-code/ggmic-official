import type { QuickAccessItem } from '@/types';

/**
 * Quick Access items shown on the Home screen. `route` values must match the
 * expo-router file structure (tab routes for Bible/Sermons/Events, stack
 * routes for everything else).
 */
export const QUICK_ACCESS: QuickAccessItem[] = [
  { id: 'bible', label: 'Bible', icon: 'menu-book', route: '/bible' },
  { id: 'sermons', label: 'Sermons', icon: 'headphones', route: '/sermons' },
  { id: 'events', label: 'Events', icon: 'event', route: '/events' },
  { id: 'prayer', label: 'Prayer', icon: 'favorite', route: '/prayer' },
  { id: 'branches', label: 'Branches', icon: 'location-on', route: '/branches' },
  { id: 'videos', label: 'Videos', icon: 'play-circle-outline', route: '/videos' },
  { id: 'leadership', label: 'Leadership', icon: 'groups', route: '/leadership' },
  { id: 'about', label: 'About Us', icon: 'info-outline', route: '/about' },
];