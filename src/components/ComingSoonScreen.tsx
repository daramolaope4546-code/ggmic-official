import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { EmptyState } from '@/components/EmptyState';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors } from '@/theme';

import type { IconName } from '@/types';

interface ComingSoonScreenProps {
  title: string;
  subtitle?: string;
  icon?: IconName;
  /** Optional factual detail to show instead of the generic fallback. */
  message?: string;
  /** Show a back button (stack screens). Hidden for tab screens. */
  showBack?: boolean;
}

/**
 * Placeholder screen used across Phase 1 for features that will be implemented
 * in later phases. Consistent header, safe-area handling and GGMIC styling.
 */
export function ComingSoonScreen({
  title,
  subtitle,
  icon = 'construction',
  message = 'This section will be available soon.',
  showBack = false,
}: ComingSoonScreenProps) {
  return (
    <View style={styles.flex}>
      <ScreenContainer scroll centered>
        <AppHeader title={title} subtitle={subtitle} showBack={showBack} />
        <EmptyState icon={icon} title="Coming Soon" message={message} />
      </ScreenContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
});