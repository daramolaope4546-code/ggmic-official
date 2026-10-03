import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import {
  colors,
  fontSizes,
  fontWeights,
  minTouchTarget,
  radius,
  spacing,
} from '@/theme';

import type { ImageSourcePropType } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  /** Optional section artwork shown before the title (major sections only). */
  image?: ImageSourcePropType;
}

/**
 * Section title with an optional "See all"-style action and optional section
 * artwork. The action row keeps a large touch target for accessibility.
 */
export function SectionHeader({ title, actionLabel, onActionPress, image }: SectionHeaderProps) {
  const { sp } = useResponsive();

  return (
    <View style={[styles.container, { marginTop: sp(spacing.xl), marginBottom: sp(spacing.sm) }]}>
      <View style={[styles.left, { gap: sp(spacing.xs) }]}>
        {image ? (
          <Image
            accessible={false}
            accessibilityIgnoresInvertColors
            resizeMode="contain"
            source={image}
            style={{ width: sp(26), height: sp(26), borderRadius: sp(radius.sm) }}
          />
        ) : null}
        <Text
          style={[
            styles.title,
            { fontSize: sp(fontSizes.title), lineHeight: sp(28) },
          ]}
        >
          {title}
        </Text>
      </View>
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
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
