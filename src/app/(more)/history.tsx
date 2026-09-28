import { StyleSheet, Text, View } from 'react-native';

import { AppCard, AppHeader, EmptyState, ScreenContainer, SectionHeader } from '@/components';
import { CHURCH_INFO } from '@/constants/churchInfo';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';

/**
 * Our History. Placeholder content is used until the organisation supplies the
 * official history; the layout is ready for a formal timeline later.
 */
export default function HistoryScreen() {
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Our History" subtitle="The story of GGMIC" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
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
      <EmptyState
        compact
        icon="history"
        title="Our church history will be added here."
        message="Once the official history is provided, a timeline of GGMIC milestones will appear here."
      />
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