import { Pressable, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { SectionThumb } from '@/components/SectionThumb';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, minTouchTarget, spacing } from '@/theme';

import type { ImageSourcePropType } from 'react-native';
import type { IconName } from '@/types';

interface MenuListItemProps {
  label: string;
  icon: IconName;
  /** Local artwork for the section; the icon is used when absent. */
  image?: ImageSourcePropType;
  onPress: () => void;
  accessibilityLabel?: string;
}

/** Single tappable row used by the Menu screen. */
export function MenuListItem({ label, icon, image, onPress, accessibilityLabel }: MenuListItemProps) {
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
      <SectionThumb icon={icon} image={image} />
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
  label: {
    flex: 1,
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
  },
});