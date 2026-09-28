import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';

import type { IconName } from '@/types';

interface BulletListProps {
  items: string[];
  icon?: IconName;
  accessibilityLabel?: string;
}

/**
 * Accessible bullet list used by the Mission and Vision pages. Each item is a
 * labelled row with an icon and full, wrapping text.
 */
export function BulletList({ items, icon = 'check-circle', accessibilityLabel }: BulletListProps) {
  const { sp } = useResponsive();

  return (
    <View
      style={[styles.container, { gap: sp(spacing.sm) }]}
      accessibilityLabel={accessibilityLabel}
    >
      {items.map((text, index) => (
        <View key={index} style={[styles.row, { gap: sp(spacing.sm) }]}>
          <View style={[styles.iconChip, { width: sp(24), height: sp(24), borderRadius: sp(12) }]}>
            <MaterialIcons name={icon} size={sp(14)} color={colors.surface} />
          </View>
          <Text style={[styles.text, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
            {text}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginTop: spacing.xxs,
  },
  text: {
    flex: 1,
    color: colors.textPrimary,
    fontWeight: fontWeights.regular,
  },
});