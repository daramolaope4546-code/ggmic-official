import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { EmptyState } from '@/components/EmptyState';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionHero } from '@/components/SectionHero';
import { colors, spacing } from '@/theme';

import type { ImageSourcePropType } from 'react-native';
import type { IconName } from '@/types';

interface ComingSoonScreenProps {
  title: string;
  subtitle?: string;
  icon?: IconName;
  /** Local artwork for the section; shown as a banner above the empty state. */
  image?: ImageSourcePropType;
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
  image,
  message = 'This section will be available soon.',
  showBack = false,
}: ComingSoonScreenProps) {
  return (
    <View style={styles.flex}>
      <ScreenContainer scroll centered>
        <AppHeader title={title} subtitle={subtitle} showBack={showBack} />
        {image ? (
          <View style={styles.hero}>
            <SectionHero image={image} />
          </View>
        ) : null}
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
  hero: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
});