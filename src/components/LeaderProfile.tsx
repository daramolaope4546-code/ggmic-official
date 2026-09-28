import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/AppCard';
import { AppHeader } from '@/components/AppHeader';
import { LeaderPhoto } from '@/components/LeaderPhoto';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionHeader } from '@/components/SectionHeader';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, lineHeights, spacing } from '@/theme';

import type { Leader } from '@/types';

interface LeaderProfileProps {
  leader: Leader;
  headerTitle: string;
  headerSubtitle?: string;
}

/**
 * Shared leader profile layout consumed by both the Founder and General
 * Overseer screens so biography/photograph handling stays in one place.
 */
export function LeaderProfile({ leader, headerTitle, headerSubtitle }: LeaderProfileProps) {
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title={headerTitle} subtitle={headerSubtitle} showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
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
          {leader.biography ?? 'Biography coming soon.'}
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