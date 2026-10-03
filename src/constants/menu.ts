import type { MenuSection } from '@/types';

/**
 * Menu screen sections. Routes reference tab routes (/sermons, /bible,
 * /events) or the upcoming-feature placeholder stack routes.
 * Features not yet implemented will open their placeholder screen.
 *
 * Items with `image` use the local GGMIC section artwork (menu set for most
 * rows, core-icons set for the church-information rows) and fall back to the
 * `icon` only if artwork is ever removed.
 */
export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'about',
    title: 'About',
    items: [
      {
        id: 'about-ggmic',
        label: 'About GGMIC',
        icon: 'info-outline',
        image: require('../../assets/images/menu/menu-about-us.png'),
        route: '/about',
      },
      {
        id: 'our-history',
        label: 'Our History',
        icon: 'history',
        image: require('../../assets/images/core-icons/our-history.png'),
        route: '/history',
      },
      {
        id: 'mission',
        label: 'Mission',
        icon: 'flag',
        image: require('../../assets/images/core-icons/mission.png'),
        route: '/mission',
      },
      {
        id: 'vision',
        label: 'Vision',
        icon: 'visibility',
        image: require('../../assets/images/core-icons/vision.png'),
        route: '/vision',
      },
      {
        id: 'motto',
        label: 'Motto',
        icon: 'format-quote',
        image: require('../../assets/images/core-icons/motto.png'),
        route: '/motto',
      },
      {
        id: 'leadership',
        label: 'Leadership',
        icon: 'groups',
        image: require('../../assets/images/menu/menu-leadership.png'),
        route: '/leadership',
      },
      {
        id: 'founder',
        label: 'Founder',
        icon: 'account-box',
        image: require('../../assets/images/core-icons/founder.png'),
        route: '/founder',
      },
      {
        id: 'general-overseer',
        label: 'General Overseer',
        icon: 'account-circle',
        image: require('../../assets/images/core-icons/general-overseer.png'),
        route: '/general-overseer',
      },
    ],
  },
  {
    id: 'ministry',
    title: 'Ministry',
    items: [
      {
        id: 'services',
        label: 'Services & Programs',
        icon: 'event-available',
        image: require('../../assets/images/menu/menu-ministries.png'),
        route: '/services',
      },
      {
        id: 'sermons',
        label: 'Sermons',
        icon: 'headphones',
        image: require('../../assets/images/menu/menu-sermons.png'),
        route: '/sermons',
      },
      {
        id: 'bible',
        label: 'Bible',
        icon: 'menu-book',
        image: require('../../assets/images/menu/menu-bible.png'),
        route: '/bible',
      },
      {
        id: 'events',
        label: 'Events',
        icon: 'event',
        image: require('../../assets/images/menu/menu-events.png'),
        route: '/events',
      },
      {
        id: 'prayer-request',
        label: 'Prayer Request',
        icon: 'favorite',
        image: require('../../assets/images/menu/menu-prayer-request.png'),
        route: '/prayer',
      },
      {
        id: 'testimonies',
        label: 'Testimonies',
        icon: 'record-voice-over',
        image: require('../../assets/images/menu/menu-testimonies.png'),
        route: '/testimonies',
      },
      {
        id: 'branches',
        label: 'Branches',
        icon: 'location-on',
        image: require('../../assets/images/menu/menu-branches.png'),
        route: '/branches',
      },
    ],
  },
  {
    id: 'media',
    title: 'Media',
    items: [
      {
        id: 'videos',
        label: 'Videos',
        icon: 'ondemand-video',
        image: require('../../assets/images/menu/menu-videos.png'),
        route: '/videos',
      },
      {
        id: 'gallery',
        label: 'Gallery',
        icon: 'photo-library',
        image: require('../../assets/images/menu/menu-gallery.png'),
        route: '/gallery',
      },
      {
        id: 'announcements',
        label: 'Announcements',
        icon: 'campaign',
        image: require('../../assets/images/menu/menu-notifications.png'),
        route: '/announcements',
      },
      {
        id: 'livestream',
        label: 'Livestream',
        icon: 'live-tv',
        image: require('../../assets/images/menu/menu-live-stream.png'),
        route: '/livestream',
      },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      {
        id: 'contact',
        label: 'Contact',
        icon: 'contact-phone',
        image: require('../../assets/images/menu/menu-contact.png'),
        route: '/contact',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        image: require('../../assets/images/menu/menu-settings.png'),
        route: '/settings',
      },
    ],
  },
];