import { View } from 'react-native';

import { AppCard, AppHeader, EmptyState, ScreenContainer, SectionHero } from '@/components';
import { CORE_ART_RATIO } from '@/constants/assets';
import { CHURCH_INFO } from '@/constants/churchInfo';
import { useResponsive } from '@/hooks/useResponsive';
import { spacing } from '@/theme';

/**
 * Our Motto. The official motto is pending, so a professional placeholder
 * explains that the text will appear once the organisation supplies it.
 */
export default function MottoScreen() {
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Our Motto" subtitle="The guiding words of GGMIC" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <SectionHero
          aspectRatio={CORE_ART_RATIO}
          image={require('../../../assets/images/core-icons/motto.png')}
          maxWidth={150}
        />
      </View>

      <View style={{ marginTop: sp(spacing.lg) }}>
        <AppCard>
          <EmptyState
            compact
            icon="format-quote"
            title={CHURCH_INFO.motto ?? 'Information coming soon.'}
            message="The official motto will be displayed here once it is provided by the organisation."
          />
        </AppCard>
      </View>
    </ScreenContainer>
  );
}