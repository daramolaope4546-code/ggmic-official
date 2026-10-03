import { ComingSoonScreen } from '@/components';

export default function PrayerScreen() {
  return (
    <ComingSoonScreen
      title="Prayer Request"
      subtitle="Share a prayer request"
      icon="favorite"
      image={require('../../../assets/images/menu/menu-prayer.png')}
      message="Prayer request submission is coming soon."
      showBack
    />
  );
}
