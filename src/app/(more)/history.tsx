import { StyleSheet, Text, View } from 'react-native';

import {
  AppCard,
  AppHeader,
  EmptyState,
  ScreenContainer,
  SectionHeader,
  SectionHero,
} from '@/components';
import { CORE_ART_RATIO } from '@/constants/assets';
import { CHURCH_INFO } from '@/constants/churchInfo';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';

/**
 * Our History. The official history is pending, so a professional placeholder
 * explains that a timeline of GGMIC milestones will appear once the
 * organisation provides it.
 */
export default function HistoryScreen() {
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Our History" subtitle="The story of GGMIC" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <SectionHero
          aspectRatio={CORE_ART_RATIO}
          image={require('../../../assets/images/core-icons/our-history.png')}
          maxWidth={150}
        />
      </View>

      <View style={{ marginTop: sp(spacing.lg) }}>
        <AppCard>
          <Text style={[styles.org, { fontSize: sp(fontSizes.title) }]}>
            {CHURCH_INFO.organisationName}
          </Text>
          <Text style={[styles.detail, { fontSize: sp(fontSizes.body), marginTop: sp(spacing.xs) }]}>
            {CHURCH_INFO.mainLocation}
          </Text>
        </AppCard>
      </View>

      <SectionHeader title="Our History" />
      <AppCard>
        <EmptyState
          compact
          icon="history"
          title={CHURCH_INFO.history ?? 'Information coming soon.'}
          message="A timeline of GGMIC milestones will be displayed here once the official history is provided."
        />
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  org: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  detail: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});