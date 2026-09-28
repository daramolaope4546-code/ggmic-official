import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import {
  colors,
  fontSizes,
  fontWeights,
  minTouchTarget,
  spacing,
} from '@/theme';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

/**
 * Section title with an optional "See all"-style action. The action row keeps
 * a large touch target for accessibility.
 */
export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  const { sp } = useResponsive();

  return (
    <View style={[styles.container, { marginTop: sp(spacing.xl), marginBottom: sp(spacing.sm) }]}>
      <Text
        style={[
          styles.title,
          { fontSize: sp(fontSizes.title), lineHeight: sp(28) },
        ]}
      >
        {title}
      </Text>
      {actionLabel && onActionPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onActionPress}
          hitSlop={8}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
        >
          <Text style={[styles.actionText, { fontSize: sp(fontSizes.small) }]}>
            {actionLabel}
          </Text>
          <MaterialIcons name="chevron-right" size={sp(16)} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: minTouchTarget,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    flexShrink: 1,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    minHeight: minTouchTarget,
    paddingLeft: spacing.sm,
  },
  actionText: {
    color: colors.primary,
    fontWeight: fontWeights.semibold,
  },
  pressed: {
    opacity: 0.6,
  },
});