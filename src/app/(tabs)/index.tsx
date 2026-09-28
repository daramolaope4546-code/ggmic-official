import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  AppCard,
  AnnouncementCard,
  AppHeader,
  EventCard,
  GGMICBrand,
  QuickAccessCard,
  ScreenContainer,
  SectionHeader,
  SermonCard,
  ServiceCard,
} from '@/components';
import { APP } from '@/constants/app';
import { NEXT_SERVICE } from '@/constants/services';
import { QUICK_ACCESS } from '@/constants/quickAccess';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, gridGap, spacing } from '@/theme';
import { gridItemWidth } from '@/utils';

/**
 * Home screen: brand, welcome, next service, quick access grid and the
 * sermon/event/announcement placeholders.
 */
export default function HomeScreen() {
  const router = useRouter();
  const { sp, columns, contentWidth } = useResponsive();
  const gap = sp(gridGap);
  const itemWidth = gridItemWidth(columns, gap, contentWidth);

  return (
    <ScreenContainer scroll centered>
      <AppHeader title={APP.name} />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <GGMICBrand />
      </View>

      <AppCard>
        <Text style={[styles.welcome, { fontSize: sp(fontSizes.title) }]}>Welcome</Text>
        <Text style={[styles.welcomeText, { fontSize: sp(fontSizes.body) }]}>
          Welcome to the official GGMIC app. Access services, sermons, events,
          prayer and more.
        </Text>
      </AppCard>

      <SectionHeader title="Next Service" />
      <ServiceCard service={NEXT_SERVICE} label="Join us" />

      <SectionHeader title="Quick Access" />
      <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap }]}>
        {QUICK_ACCESS.map((item) => (
          <View key={item.id} style={{ width: itemWidth }}>
            <QuickAccessCard
              label={item.label}
              icon={item.icon}
              onPress={() => router.push(item.route)}
            />
          </View>
        ))}
      </View>

      <SectionHeader title="Latest Sermon" />
      <SermonCard placeholder />

      <SectionHeader title="Upcoming Event" />
      <EventCard placeholder />

      <SectionHeader title="Announcements" />
      <AnnouncementCard placeholder />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  welcome: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  welcomeText: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});