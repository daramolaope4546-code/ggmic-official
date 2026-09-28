import { Pressable, StyleSheet, Text, View } from 'react-native';
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

import type { IconName } from '@/types';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
}

const variantStyles: Record<
  ButtonVariant,
  { background: string; text: string; border?: string }
> = {
  primary: { background: colors.primary, text: colors.textOnPrimary },
  secondary: { background: colors.primarySoft, text: colors.primaryDark },
  outline: { background: colors.surface, text: colors.primary, border: colors.primary },
  ghost: { background: colors.transparent, text: colors.primary },
};

/** Primary action button with accessible labelling and disabled/loading states. */
export function AppButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  accessibilityLabel,
}: AppButtonProps) {
  const { sp } = useResponsive();
  const stylesForVariant = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { minHeight: sp(minTouchTarget), borderRadius: sp(radius.md) },
        fullWidth && styles.fullWidth,
        { backgroundColor: stylesForVariant.background },
        stylesForVariant.border != null && { borderWidth: 1.5, borderColor: stylesForVariant.border },
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <View style={styles.spinnerPlaceholder} />
        ) : (
          icon && iconPosition === 'left' ? (
<MaterialIcons name={icon} size={sp(20)} color={stylesForVariant.text} />
          ) : null
        )}
        <Text
          style={[
            styles.label,
            { fontSize: sp(fontSizes.body), lineHeight: sp(24) },
            { color: stylesForVariant.text, fontWeight: fontWeights.semibold },
          ]}
        >
          {loading ? 'Loading…' : title}
        </Text>
        {!loading && icon && iconPosition === 'right' ? (
          <MaterialIcons name={icon} size={sp(20)} color={stylesForVariant.text} />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  label: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  spinnerPlaceholder: {
    width: 20,
    height: 20,
  },
});