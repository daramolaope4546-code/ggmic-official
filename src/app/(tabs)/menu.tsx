import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppHeader, MenuListItem, ScreenContainer } from '@/components';
import { MENU_SECTIONS } from '@/constants/menu';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';

/**
 * Menu screen: grouped links to all GGMIC features. Features without an
 * implementation yet open their placeholder screen.
 */
export default function MenuScreen() {
  const router = useRouter();
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Menu" subtitle="Explore GGMIC" />
      <View style={{ marginTop: sp(spacing.xs) }}>
        {MENU_SECTIONS.map((section) => (
          <View key={section.id} style={{ marginBottom: sp(spacing.xl) }}>
            <Text
              style={[
                styles.sectionTitle,
                { fontSize: sp(fontSizes.small), marginBottom: sp(spacing.xs) },
              ]}
            >
              {section.title}
            </Text>
            <View style={styles.group}>
              {section.items.map((item) => (
                <MenuListItem
                  key={item.id}
                  icon={item.icon}
                  image={item.image}
                  label={item.label}
                  onPress={() => router.push(item.route)}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.textSecondary,
    fontWeight: fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  group: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
  },
});