import { StyleSheet, Text, View } from 'react-native';

import {
  AppCard,
  AppHeader,
  BranchCard,
  ScreenContainer,
  SectionHeader,
  SectionHero,
} from '@/components';
import { BRANCHES } from '@/constants/branches';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, spacing } from '@/theme';

/**
 * Branches: known church locations. Only the main branch is confirmed; the
 * list is data-driven so additional branches and map coordinates render
 * automatically once they are officially supplied.
 */
export default function BranchesScreen() {
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Branches" subtitle="Church locations" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <SectionHero image={require('../../../assets/images/menu/menu-branches.png')} />
      </View>

      <View style={{ marginTop: sp(spacing.md) }}>
        <AppCard>
          <Text style={[styles.intro, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
            Find a GGMIC location near you.
          </Text>
        </AppCard>
      </View>

      <SectionHeader title="Our Locations" />

      <View style={{ gap: sp(spacing.md) }}>
        {BRANCHES.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </View>

      <Text style={[styles.note, { fontSize: sp(fontSizes.caption), marginTop: sp(spacing.lg) }]}>
        Only the main church location is currently published. Additional
        branches and map directions will be listed here once they are officially
        provided.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: {
    color: colors.textSecondary,
  },
  note: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});