import type { Leader } from '@/types';

/**
 * Leaf data for church leadership. Only organisation-confirmed details are
 * stored. Biography and photograph fields stay empty until the organisation
 * supplies them; the UI renders "Biography coming soon." and a photo
 * placeholder automatically.
 */
export const LEADERS: Leader[] = [
  {
    id: 'founder',
    name: 'Pastor S.S. Bolarinwa',
    title: 'Founder / Late General Overseer',
    bioPreview: 'Biography coming soon.',
    route: '/founder',
  },
  {
    id: 'general-overseer',
    name: 'Pastor Dr. O.S. Bolarinwa',
    title: 'Current General Overseer',
    bioPreview: 'Biography coming soon.',
    route: '/general-overseer',
  },
];

export const FOUNDER: Leader = LEADERS[0];
export const GENERAL_OVERSEER: Leader = LEADERS[1];

/** Look up a leader by id/route-safe key. */
export function getLeader(id: string): Leader | undefined {
  return LEADERS.find((leader) => leader.id === id);
}