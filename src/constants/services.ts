import { CORE_ART_RATIO, MENU_ART_RATIO } from '@/constants/assets';
import type { ServiceProgram, ServiceRecurrence } from '@/types';

/**
 * LOCAL DEMO DATA - Phase 1/2 only.
 *
 * The officially confirmed GGMIC services and programs. A later phase will
 * replace these values with data fetched from the backend/CMS; keep this module
 * free of UI imports so it can be swapped for an API call without touching
 * components.
 *
 * Only confirmed facts are stored. Times, descriptions, venues and speakers
 * are left out unless the organisation supplied them, so nothing is invented.
 */
export const SERVICES: ServiceProgram[] = [
  {
    id: 'sunday-service',
    title: 'Sunday Service',
    recurrence: 'weekly',
    rule: { type: 'weekly', weekday: 0 },
    schedule: 'Every Sunday',
    time: '8:00 AM',
    active: true,
    icon: 'church',
    image: require('../../assets/images/core-icons/sunday-service.png'),
    imageAspectRatio: CORE_ART_RATIO,
  },
  {
    id: 'bible-study',
    title: 'Bible Study',
    recurrence: 'weekly',
    rule: { type: 'weekly', weekday: 2 },
    schedule: 'Every Tuesday',
    time: '5:00 PM',
    active: true,
    icon: 'menu-book',
    image: require('../../assets/images/core-icons/bible.png'),
    imageAspectRatio: CORE_ART_RATIO,
  },
  {
    id: 'miracle-hour',
    title: 'Miracle Hour Service',
    recurrence: 'weekly',
    rule: { type: 'weekly', weekday: 3 },
    schedule: 'Every Wednesday',
    time: '9:00 AM',
    active: true,
    icon: 'favorite',
    image: require('../../assets/images/menu/menu-prayer.png'),
    imageAspectRatio: MENU_ART_RATIO,
  },
  {
    id: 'fight-and-win-vigil',
    title: 'Fight and Win Vigil',
    recurrence: 'monthly',
    rule: { type: 'monthly-nth-weekday', weekday: 5, nth: -1 },
    schedule: 'Last Friday of every month',
    active: true,
    icon: 'shield',
  },
  {
    id: 'hour-of-favour',
    title: 'Hour of Favour',
    recurrence: 'monthly',
    rule: { type: 'monthly-day', day: 1 },
    schedule: 'First day of every month',
    active: true,
    icon: 'auto-awesome',
  },
  {
    id: 'solution-night',
    title: 'Solution Night',
    recurrence: 'monthly',
    rule: { type: 'monthly-nth-weekday', weekday: 5, nth: 2 },
    schedule: 'Second Friday of every month',
    location: 'House of Praise Assembly',
    active: true,
    icon: 'lightbulb',
  },
  {
    id: 'rivers-of-living-waters',
    title: 'Rivers of Living Waters',
    recurrence: 'seasonal',
    rule: { type: 'yearly-days', months: [4, 8, 12], days: [1, 2, 3] },
    schedule: 'Day 1–3 in April, August and December every year',
    active: true,
    icon: 'water-drop',
  },
];

/**
 * Display order and titles for the recurrence groups shown on the Services
 * screen. Centralised here so screens never hard-code schedule groupings.
 */
export const SERVICE_GROUPS: { recurrence: ServiceRecurrence; title: string }[] = [
  { recurrence: 'weekly', title: 'Weekly Services' },
  { recurrence: 'monthly', title: 'Monthly Programs' },
  { recurrence: 'seasonal', title: 'Special Programs' },
];

/** Short label for a recurrence type, e.g. shown as a card badge. */
export const SERVICE_RECURRENCE_LABELS: Record<ServiceRecurrence, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  seasonal: 'Special',
};
