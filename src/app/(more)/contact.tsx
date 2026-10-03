import { ComingSoonScreen } from '@/components';
import { APP } from '@/constants/app';

export default function ContactScreen() {
  return (
    <ComingSoonScreen
      title="Contact"
      subtitle={APP.mainLocation}
      icon="contact-phone"
      image={require('../../../assets/images/menu/menu-contact.png')}
      message="Contact details and maps are coming soon."
      showBack
    />
  );
}
