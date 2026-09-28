import type { ServiceProgram } from '@/types';

/**
 * LOCAL DEMO DATA - Phase 1/2 only.
 *
 * Static confirmed service schedule used to render the UI. A later phase will
 * replace these values with data fetched from the backend. Keep this module
 * free of UI imports so it can be swapped for an API call without touching
 * components.
 */
export const SERVICES: ServiceProgram[] = [
  {
    id: 'sunday-service',
    name: 'Sunday Service',
    day: 'Sunday',
    time: '8:00 AM',
    frequency: 'Every Sunday',
    icon: 'church',
    branch: 'Main Branch',
    location: 'Behind Mechanic Village, Akure, Ondo State',
  },
  {
    id: 'bible-study',
    name: 'Bible Study',
    day: 'Tuesday',
    time: '5:00 PM',
    frequency: 'Every Tuesday',
    icon: 'menu-book',
    branch: 'Main Branch',
    location: 'Behind Mechanic Village, Akure, Ondo State',
  },
  {
    id: 'miracle-hour',
    name: 'Miracle Hour',
    day: 'Wednesday',
    time: '9:00 AM',
    frequency: 'Every Wednesday',
    icon: 'favorite',
    branch: 'Main Branch',
    location: 'Behind Mechanic Village, Akure, Ondo State',
  },
];

/** The single service promoted on the Home screen. Backend-ready seam. */
export const NEXT_SERVICE: ServiceProgram = SERVICES[0];