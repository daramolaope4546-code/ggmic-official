import { ComingSoonScreen } from '@/components';

export default function LivestreamScreen() {
  return (
    <ComingSoonScreen
      title="Livestream"
      subtitle="Watch live services"
      icon="live-tv"
      image={require('../../../assets/images/menu/menu-live-stream.png')}
      message="Live streaming is coming soon."
      showBack
    />
  );
}
