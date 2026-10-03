import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/AppCard';
import { AppHeader } from '@/components/AppHeader';
import { LeaderPhoto } from '@/components/LeaderPhoto';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionHero } from '@/components/SectionHero';
import { CORE_ART_RATIO } from '@/constants/assets';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, lineHeights, spacing } from '@/theme';

import type { ImageSourcePropType } from 'react-native';
import type { Leader } from '@/types';

interface LeaderProfileProps {
  leader: Leader;
  headerTitle: string;
  headerSubtitle?: string;
  /** Optional section artwork shown beneath the header. */
  image?: ImageSourcePropType;
}

/**
 * Shared leader profile layout consumed by both the Founder and General
 * Overseer screens so biography/photograph handling stays in one place.
 */
export function LeaderProfile({ leader, headerTitle, headerSubtitle, image }: LeaderProfileProps) {
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title={headerTitle} subtitle={headerSubtitle} showBack />

      {image ? (
        <View style={{ marginTop: sp(spacing.xs) }}>
          <SectionHero aspectRatio={CORE_ART_RATIO} image={image} maxWidth={160} />
        </View>
      ) : null}

      <View style={{ marginTop: sp(spacing.md) }}>
        <AppCard>
          <View style={styles.profile}>
            <LeaderPhoto size={128} name={leader.name} />
            <Text
              style={[
                styles.name,
                { fontSize: sp(fontSizes.heading), lineHeight: sp(lineHeights.heading), marginTop: sp(spacing.md) },
              ]}
            >
              {leader.name}
            </Text>
            <Text
              style={[
                styles.title,
                { fontSize: sp(fontSizes.body), lineHeight: sp(lineHeights.body), marginTop: sp(spacing.xs) },
              ]}
            >
              {leader.title}
            </Text>
          </View>
        </AppCard>
      </View>

      <SectionHeader title="Biography" />
      <AppCard>
        <Text style={[styles.biography, { fontSize: sp(fontSizes.body), lineHeight: sp(lineHeights.body) }]}>
          {leader.biography ??
            'The official biography will be displayed here once it is provided by the organisation.'}
        </Text>
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
  },
  name: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  title: {
    color: colors.primary,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  biography: {
    color: colors.textSecondary,
  },
});