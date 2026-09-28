import { ComingSoonScreen } from '@/components';

/** Fallback for any route that does not exist. */
export default function NotFoundScreen() {
  return (
    <ComingSoonScreen
      title="Page Not Found"
      subtitle="This page does not exist"
      icon="error-outline"
      message="The page you are looking for could not be found."
      showBack
    />
  );
}