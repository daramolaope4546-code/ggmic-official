import { ComingSoonScreen } from '@/components';
import { CHURCH_INFO } from '@/constants/churchInfo';

/**
 * Our Motto. The official motto is pending; a clear placeholder is shown until
 * the organisation supplies the text.
 */
export default function MottoScreen() {
  return (
    <ComingSoonScreen
      title="Our Motto"
      subtitle="The mission words of GGMIC"
      icon="format-quote"
      message={CHURCH_INFO.motto ?? 'Information coming soon.'}
      showBack
    />
  );
}