import { ComingSoonScreen } from '@/components';

export default function SettingsScreen() {
  return (
    <ComingSoonScreen
      title="Settings"
      subtitle="Preferences"
      icon="settings"
      image={require('../../../assets/images/menu/menu-settings.png')}
      message="Settings will be available soon."
      showBack
    />
  );
}
