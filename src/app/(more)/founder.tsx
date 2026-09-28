import { LeaderProfile } from '@/components';
import { FOUNDER } from '@/constants/leaders';

/**
 * Founder profile: Pastor S.S. Bolarinwa. Biography and photograph render
 * placeholders until officially supplied.
 */
export default function FounderScreen() {
  return <LeaderProfile leader={FOUNDER} headerTitle="Founder" headerSubtitle="Pastor S.S. Bolarinwa" />;
}