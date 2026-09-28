import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, minTouchTarget, radius, spacing } from '@/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  onClear,
  onSubmit,
  placeholder = 'Search…',
  autoFocus = false,
}: SearchBarProps) {
  const { sp } = useResponsive();

  return (
    <View
      style={[
        styles.container,
        { borderRadius: sp(radius.lg), minHeight: sp(minTouchTarget), paddingHorizontal: sp(spacing.md) },
      ]}
    >
      <MaterialIcons name="search" size={sp(20)} color={colors.textSecondary} />
      <TextInput
        style={[styles.input, { fontSize: sp(fontSizes.body), minHeight: sp(minTouchTarget) }]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={colors.textDisabled}
        returnKeyType="search"
        autoFocus={autoFocus}
        allowFontScaling
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          hitSlop={8}
          onPress={onClear}
          style={({ pressed }) => [styles.clearBtn, pressed && styles.pressed]}
        >
          <MaterialIcons name="close" size={sp(18)} color={colors.textSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    padding: 0,
  },
  clearBtn: {
    width: minTouchTarget,
    height: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },
});
