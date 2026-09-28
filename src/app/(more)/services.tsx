import { StyleSheet, Text, View } from 'react-native';

import { AppCard, AppHeader, ScreenContainer, ServiceCard } from '@/components';
import { SERVICES } from '@/constants/services';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, spacing } from '@/theme';

/**
 * Services & Programs: the confirmed weekly programme. Data comes from the
 * shared services constant so it can be replaced by an API later without
 * touching the UI.
 */
export default function ServicesScreen() {
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Services & Programs" subtitle="Weekly gatherings" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <AppCard>
          <Text style={[styles.intro, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
            Join us weekly at THE GRACE OF GOD MIRACLE INTERNATIONAL Church for
            worship, study of the word, and prayer.
          </Text>
        </AppCard>
      </View>

      <View style={{ marginTop: sp(spacing.lg), gap: sp(spacing.md) }}>
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: {
    color: colors.textSecondary,
  },
});