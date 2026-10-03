import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppCard, AppHeader, LeaderCard, ScreenContainer, SectionHeader } from '@/components';
import { LEADERS } from '@/constants/leaders';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, contentMaxWidth, fontSizes, fontWeights, gridGap, spacing } from '@/theme';
import { gridItemWidth } from '@/utils';

/**
 * Leadership: introduces the confirmed leaders with photo placeholders and
 * profile links. Cards wrap into two columns on tablets, capped to the shared
 * content width so the grid never overflows.
 */
export default function LeadershipScreen() {
  const router = useRouter();
  const { sp, isTablet, contentWidth } = useResponsive();
  const columns = isTablet ? 2 : 1;
  const gap = sp(gridGap);
  const usableContentWidth = Math.min(contentWidth, contentMaxWidth);
  const itemWidth = gridItemWidth(columns, gap, usableContentWidth);

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Leadership" subtitle="The leaders of GGMIC" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <AppCard>
          <Text style={[styles.intro, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
            Meet the leadership of {''}
            <Text style={styles.strong}>THE GRACE OF GOD MIRACLE INTERNATIONAL</Text>.
            Official photographs and biographies will be added as they become
            available.
          </Text>
        </AppCard>
      </View>

      <SectionHeader title="Our Leaders" />

      <View style={[styles.grid, { gap }]}>
        {LEADERS.map((leader) => (
          <View key={leader.id} style={{ width: itemWidth }}>
            <LeaderCard leader={leader} onViewProfile={() => router.push(leader.route)} />
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: {
    color: colors.textSecondary,
  },
  strong: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});