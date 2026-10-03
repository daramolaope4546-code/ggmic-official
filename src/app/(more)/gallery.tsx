import { ComingSoonScreen } from '@/components';

export default function GalleryScreen() {
  return (
    <ComingSoonScreen
      title="Gallery"
      subtitle="Moments from GGMIC"
      icon="photo-library"
      image={require('../../../assets/images/menu/menu-gallery.png')}
      message="Photo gallery is coming soon."
      showBack
    />
  );
}
