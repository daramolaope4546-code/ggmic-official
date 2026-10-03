import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { APP } from '@/constants/app';
import { LOGO_ASPECT_RATIO } from '@/constants/assets';
import { useResponsive } from '@/hooks/useResponsive';
import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  minTouchTarget,
  radius,
  spacing,
} from '@/theme';

import type { IconName } from '@/types';

const LOGO_SIZE = 42;

/** Compact app-bar style header for the Home landing page. */
export function HomeHeader() {
  const router = useRouter();
  const { sp } = useResponsive();

  return (
    <View
      style={[
        styles.container,
        { minHeight: sp(minTouchTarget + spacing.xs), gap: sp(spacing.sm) },
      ]}
      accessibilityRole="header"
    >
      <View style={[styles.brand, { gap: sp(spacing.sm) }]}>
        <Image
          accessible
          accessibilityLabel="GGMIC logo"
          resizeMode="contain"
          source={APP.logoSource}
          style={{ width: sp(LOGO_SIZE), aspectRatio: LOGO_ASPECT_RATIO }}
        />
        <View style={styles.titles}>
          <Text
            numberOfLines={1}
            style={[
              styles.name,
              { fontSize: sp(fontSizes.subtitle), lineHeight: sp(lineHeights.subtitle) },
            ]}
          >
            {APP.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.org,
              { fontSize: sp(fontSizes.caption), lineHeight: sp(lineHeights.caption) },
            ]}
          >
            {APP.organizationLong}
          </Text>
        </View>
      </View>

      <View style={[styles.actions, { gap: sp(spacing.xxs) }]}>
        <HeaderAction
          icon="notifications-none"
          label="Announcements"
          onPress={() => router.push('/announcements')}
        />
        <HeaderAction icon="menu" label="Open menu" onPress={() => router.push('/menu')} />
      </View>
    </View>
  );
}

interface HeaderActionProps {
  icon: IconName;
  label: string;
  onPress: () => void;
}

function HeaderAction({ icon, label, onPress }: HeaderActionProps) {
  const { sp } = useResponsive();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.action,
        { width: sp(44), height: sp(44), borderRadius: sp(radius.pill) },
        pressed && styles.pressed,
      ]}
    >
      <MaterialIcons name={icon} size={sp(24)} color={colors.primaryDark} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titles: {
    flex: 1,
    flexShrink: 1,
  },
  name: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  org: {
    color: colors.textSecondary,
    fontWeight: fontWeights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  pressed: {
    opacity: 0.7,
  },
});
