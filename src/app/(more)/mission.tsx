import { StyleSheet, Text, View } from 'react-native';

import { AppCard, AppHeader, BulletList, ScreenContainer, SectionHero } from '@/components';
import { CORE_ART_RATIO } from '@/constants/assets';
import { CHURCH_INFO } from '@/constants/churchInfo';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';

/**
 * Our Mission. Text is supplied by the organisation and rendered verbatim;
 * the page structure is ready for future editorial content.
 */
export default function MissionScreen() {
  const { sp } = useResponsive();
  const mission = CHURCH_INFO.mission;

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Our Mission" subtitle="What GGMIC is called to do" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <SectionHero
          aspectRatio={CORE_ART_RATIO}
          image={require('../../../assets/images/core-icons/mission.png')}
          maxWidth={150}
        />
      </View>

      <View style={{ marginTop: sp(spacing.lg) }}>
        <Text style={[styles.lead, { fontSize: sp(fontSizes.title) }]}>Our Mission</Text>
        <Text style={[styles.leadText, { fontSize: sp(fontSizes.body), marginTop: sp(spacing.xs) }]}>
          {CHURCH_INFO.organisationName}
        </Text>
      </View>

      {mission && mission.length > 0 ? (
        <View style={{ marginTop: sp(spacing.lg) }}>
          <AppCard>
            <BulletList items={mission} icon="flag" accessibilityLabel="GGMIC mission statements" />
          </AppCard>
        </View>
      ) : null}

      <Text style={[styles.note, { fontSize: sp(fontSizes.caption), marginTop: sp(spacing.lg) }]}>
        Published as officially provided by {CHURCH_INFO.organisationName}.
      </Text>
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
  note: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});