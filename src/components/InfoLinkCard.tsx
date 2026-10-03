import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppCard } from '@/components/AppCard';
import { SectionThumb } from '@/components/SectionThumb';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, minTouchTarget, spacing } from '@/theme';

import type { ImageSourcePropType } from 'react-native';
import type { IconName } from '@/types';

interface InfoLinkCardProps {
  label: string;
  subtitle?: string;
  icon: IconName;
  /** Local artwork for the section; the icon is used when absent. */
  image?: ImageSourcePropType;
  onPress: () => void;
  accessibilityLabel?: string;
}

/**
 * Tappable section link used on the About page to navigate between GGMIC
 * information screens. Uses the standard card surface for consistent styling.
 */
export function InfoLinkCard({
  label,
  subtitle,
  icon,
  image,
  onPress,
  accessibilityLabel,
}: InfoLinkCardProps) {
  const { sp } = useResponsive();

  return (
    <AppCard onPress={onPress} accessibilityLabel={accessibilityLabel ?? label}>
      <View style={[styles.row, { gap: sp(spacing.sm) }]}>
        <SectionThumb icon={icon} image={image} />
        <View style={styles.titles}>
          <Text style={[styles.label, { fontSize: sp(fontSizes.body) }]}>{label}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { fontSize: sp(fontSizes.small) }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <MaterialIcons name="chevron-right" size={sp(22)} color={colors.textDisabled} />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: minTouchTarget,
  },
  titles: {
    flex: 1,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 2,
  },
});