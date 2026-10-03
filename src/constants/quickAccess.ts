import type { QuickAccessItem } from '@/types';

/**
 * Quick Access items shown on the Home screen. `route` values must match the
 * expo-router file structure (tab routes for Bible/Sermons/Events, stack
 * routes for everything else). `image` is a local artwork asset from
 * `assets/images/quick-access/`.
 */
export const QUICK_ACCESS: QuickAccessItem[] = [
  {
    id: 'bible',
    label: 'Bible',
    image: require('../../assets/images/quick-access/quick-access-bible.png'),
    route: '/bible',
  },
  {
    id: 'sermons',
    label: 'Sermons',
    image: require('../../assets/images/quick-access/quick-access-sermons.png'),
    route: '/sermons',
  },
  {
    id: 'events',
    label: 'Events',
    image: require('../../assets/images/quick-access/quick-access-events.png'),
    route: '/events',
  },
  {
    id: 'prayer',
    label: 'Prayer',
    image: require('../../assets/images/quick-access/quick-access-prayer.png'),
    route: '/prayer',
  },
  {
    id: 'branches',
    label: 'Branches',
    image: require('../../assets/images/quick-access/quick-access-branches.png'),
    route: '/branches',
  },
  {
    id: 'videos',
    label: 'Videos',
    image: require('../../assets/images/quick-access/quick-access-videos.png'),
    route: '/videos',
  },
  {
    id: 'leadership',
    label: 'Leadership',
    image: require('../../assets/images/quick-access/quick-access-leadership.png'),
    route: '/leadership',
  },
  {
    id: 'gallery',
    label: 'Gallery',
    image: require('../../assets/images/quick-access/quick-access-gallery.png'),
    route: '/gallery',
  },
];