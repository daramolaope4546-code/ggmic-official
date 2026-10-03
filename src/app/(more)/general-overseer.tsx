import { LeaderProfile } from '@/components';
import { GENERAL_OVERSEER } from '@/constants/leaders';

/**
 * Current General Overseer profile: Pastor Dr. O.S. Bolarinwa. Biography and
 * photograph render placeholders until officially supplied.
 */
export default function GeneralOverseerScreen() {
  return (
    <LeaderProfile
      leader={GENERAL_OVERSEER}
      headerTitle="General Overseer"
      headerSubtitle="Pastor Dr. O.S. Bolarinwa"
      image={require('../../../assets/images/core-icons/general-overseer.png')}
    />
  );
}