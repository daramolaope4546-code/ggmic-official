import { ComingSoonScreen } from '@/components';

export default function VideosScreen() {
  return (
    <ComingSoonScreen
      title="Videos"
      subtitle="Watch GGMIC media"
      icon="play-circle-outline"
      image={require('../../../assets/images/menu/menu-videos.png')}
      message="Video content is coming soon."
      showBack
    />
  );
}
