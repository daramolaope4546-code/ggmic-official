import { StyleSheet, Text, View } from 'react-native';

import { AppCard, AppHeader, BranchCard, ScreenContainer } from '@/components';
import { BRANCHES } from '@/constants/branches';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, spacing } from '@/theme';

/**
 * Branches: known church locations. Only the main branch is confirmed; the
 * list is data-driven so additional branches render automatically.
 */
export default function BranchesScreen() {
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Branches" subtitle="Church locations" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <AppCard>
          <Text style={[styles.intro, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
            Find a GGMIC location near you.
          </Text>
        </AppCard>
      </View>

      <View style={{ marginTop: sp(spacing.lg), gap: sp(spacing.md) }}>
        {BRANCHES.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: {
    color: colors.textSecondary,
  },
});