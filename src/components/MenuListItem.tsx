import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, minTouchTarget, radius, spacing } from '@/theme';

import type { IconName } from '@/types';

interface MenuListItemProps {
  label: string;
  icon: IconName;
  onPress: () => void;
  accessibilityLabel?: string;
}

/** Single tappable row used by the Menu screen. */
export function MenuListItem({ label, icon, onPress, accessibilityLabel }: MenuListItemProps) {
  const { sp } = useResponsive();

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { minHeight: sp(minTouchTarget + spacing.xs), gap: sp(spacing.sm) },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconChip,
          { width: sp(40), height: sp(40), borderRadius: sp(20) },
        ]}
      >
        <MaterialIcons name={icon} size={sp(20)} color={colors.primary} />
      </View>
      <Text
        numberOfLines={1}
        style={[styles.label, { fontSize: sp(fontSizes.body) }]}
      >
        {label}
      </Text>
      <MaterialIcons name="chevron-right" size={sp(20)} color={colors.textDisabled} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  pressed: {
    opacity: 0.6,
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  label: {
    flex: 1,
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
  },
});