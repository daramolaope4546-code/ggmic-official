import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppCard, AppHeader, LeaderCard, ScreenContainer } from '@/components';
import { LEADERS } from '@/constants/leaders';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, gridGap, spacing } from '@/theme';
import { gridItemWidth } from '@/utils';

/**
 * Leadership: introduces the known leaders with photo placeholders and profile
 * links. Cards wrap into two columns on tablets.
 */
export default function LeadershipScreen() {
  const router = useRouter();
  const { sp, isTablet, contentWidth } = useResponsive();
  const columns = isTablet ? 2 : 1;
  const gap = sp(gridGap);
  const itemWidth = gridItemWidth(columns, gap, contentWidth);

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Leadership" subtitle="The leaders of GGMIC" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <AppCard>
          <Text style={[styles.intro, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
            Meet the leaders of {''}
            <Text style={styles.strong}>THE GRACE OF GOD MIRACLE INTERNATIONAL</Text>.
            Detailed profiles will be added as information becomes available.
          </Text>
        </AppCard>
      </View>

      <View style={[styles.grid, { gap, marginTop: sp(spacing.lg) }]}>
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