import { ComingSoonScreen } from '@/components';

export default function TestimoniesScreen() {
  return (
    <ComingSoonScreen
      title="Testimonies"
      subtitle="Share your story"
      icon="record-voice-over"
      image={require('../../../assets/images/menu/menu-testimonies.png')}
      message="Testimony submission is coming soon."
      showBack
    />
  );
}
