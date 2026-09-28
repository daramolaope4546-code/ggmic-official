import type { Sermon } from '@/types';

/**
 * LOCAL DEMO DATA — Sermon library preview.
 *
 * All sermon records are clearly sample content. No invented dates are
 * presented as real GGMIC sermon dates. `audioUrl` and `videoUrl` are
 * intentionally left undefined — media playback will be connected in a
 * later phase. A later phase will replace this with API-fetched data.
 */

export const DEMO_SERMONS: Sermon[] = [
  {
    id: 'sample-faith-hope',
    title: 'Sample Sermon — Faith and Hope',
    category: 'Faith',
    description:
      'Sample sermon content for the development preview. This is not a real sermon recording — official sermon data will be loaded from the backend in a later phase.',
  },
  {
    id: 'sample-power-of-prayer',
    title: 'Sample Sermon — The Power of Prayer',
    category: 'Prayer',
    description:
      'Sample sermon content for the development preview. The sermon library UI demonstrates how sermons will be browsed and searched once backend data is connected.',
  },
  {
    id: 'sample-living-gratitude',
    title: 'Sample Sermon — Living in Gratitude',
    category: 'Christian Living',
    description:
      'Sample sermon content for the development preview. No real sermon recordings or speaker information are included.',
  },
  {
    id: 'sample-strength-today',
    title: 'Sample Sermon — Strength for Today',
    category: 'Faith',
    featured: true,
    description:
      'Sample sermon content for the development preview. This featured card demonstrates how promoted sermons will appear on the Sermons home screen.',
  },
  {
    id: 'sample-walking-love',
    title: 'Sample Sermon — Walking in Love',
    category: 'Christian Living',
    description:
      'Sample sermon content for the development preview. The sermon search and category filters operate on this demo dataset.',
  },
  {
    id: 'sample-trusting-plan',
    title: 'Sample Sermon — Trusting God\'s Plan',
    category: 'Worship',
    description:
      'Sample sermon content for the development preview. Official sermon titles, speakers and dates will be supplied by the ministry.',
  },
];

export const SERMON_CATEGORIES: string[] = [
  'Faith',
  'Prayer',
  'Worship',
  'Christian Living',
];
