import { StyleSheet, Text, View } from 'react-native';

import { AppCard, AppHeader, BulletList, ScreenContainer } from '@/components';
import { CHURCH_INFO } from '@/constants/churchInfo';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';

/**
 * Our Vision. Text is supplied by the organisation and rendered verbatim.
 */
export default function VisionScreen() {
  const { sp } = useResponsive();
  const vision = CHURCH_INFO.vision;

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Our Vision" subtitle="Where GGMIC is headed" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <Text style={[styles.lead, { fontSize: sp(fontSizes.title) }]}>Our Vision</Text>
        <Text style={[styles.leadText, { fontSize: sp(fontSizes.body), marginTop: sp(spacing.xs) }]}>
          {CHURCH_INFO.organisationName}
        </Text>
      </View>

      {vision && vision.length > 0 ? (
        <View style={{ marginTop: sp(spacing.lg) }}>
          <AppCard>
            <BulletList items={vision} icon="check-circle" accessibilityLabel="GGMIC vision statements" />
          </AppCard>
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  lead: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  leadText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});