import type { Branch } from '@/types';

/**
 * Confirmed church locations. Only the main church is known; do not add
 * invented branches. Coordinates are omitted (not supplied) until map
 * integration is added.
 */
export const BRANCHES: Branch[] = [
  {
    id: 'main',
    name: 'Main Branch',
    addressLine: 'Behind Mechanic Village',
    city: 'Akure',
    state: 'Ondo State',
    country: 'Nigeria',
    isMain: true,
  },
];

export const MAIN_BRANCH: Branch = BRANCHES[0];