import { ComingSoonScreen } from '@/components';
import { APP } from '@/constants/app';

export default function ContactScreen() {
  return (
    <ComingSoonScreen
      title="Contact"
      subtitle={APP.mainLocation}
      icon="contact-phone"
      message="Contact details and maps are coming soon."
      showBack
    />
  );
}