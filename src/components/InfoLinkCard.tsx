import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppCard } from '@/components/AppCard';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, minTouchTarget, spacing } from '@/theme';

import type { IconName } from '@/types';

interface InfoLinkCardProps {
  label: string;
  subtitle?: string;
  icon: IconName;
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
  onPress,
  accessibilityLabel,
}: InfoLinkCardProps) {
  const { sp } = useResponsive();

  return (
    <AppCard onPress={onPress} accessibilityLabel={accessibilityLabel ?? label}>
      <View style={[styles.row, { gap: sp(spacing.sm) }]}>
        <View
          style={[
            styles.iconChip,
            { width: sp(44), height: sp(44), borderRadius: sp(22) },
          ]}
        >
          <MaterialIcons name={icon} size={sp(22)} color={colors.primary} />
        </View>
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
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
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