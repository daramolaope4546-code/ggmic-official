import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  AnnouncementCard,
  AppHeader,
  EmptyState,
  FilterChip,
  ScreenContainer,
  SectionHeader,
  SectionHero,
} from '@/components';
import { CORE_ART_RATIO } from '@/constants/assets';
import { ANNOUNCEMENT_CATEGORIES, ANNOUNCEMENT_CATEGORY_MAP } from '@/constants/announcements';
import { useResponsive } from '@/hooks/useResponsive';
import { filterAnnouncements, getFeaturedAnnouncement } from '@/services/announcements';
import { colors, fontSizes, spacing } from '@/theme';

import type { AnnouncementCategory } from '@/types';

/**
 * Announcements: a featured notice, mobile-friendly category filters and the
 * announcement list. Data comes from the announcements service so an API/CMS
 * feed can replace the demo array without touching this screen.
 */
export default function AnnouncementsScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const [category, setCategory] = useState<AnnouncementCategory | null>(null);

  const featured = category ? undefined : getFeaturedAnnouncement();
  const announcements = filterAnnouncements(category).filter(
    (announcement) => announcement.id !== featured?.id,
  );

  const openDetail = (id: string) =>
    router.push({ pathname: '/announcements/detail', params: { id } });

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Announcements" subtitle="Church notices & reminders" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <SectionHero
          aspectRatio={CORE_ART_RATIO}
          image={require('../../../../assets/images/core-icons/announcement.png')}
          maxWidth={150}
        />
      </View>

      <View style={[styles.filters, { gap: sp(spacing.xs), marginTop: sp(spacing.md) }]}>
        <FilterChip
          label="All"
          selected={category === null}
          onPress={() => setCategory(null)}
        />
        {ANNOUNCEMENT_CATEGORIES.map((item) => (
          <FilterChip
            key={item.id}
            label={item.label}
            selected={category === item.id}
            onPress={() => setCategory(item.id)}
          />
        ))}
      </View>

      {featured ? (
        <>
          <SectionHeader
            title="Featured"
            image={require('../../../../assets/images/core-icons/announcement.png')}
          />
          <AnnouncementCard
            announcement={featured}
            featured
            onPress={() => openDetail(featured.id)}
          />
        </>
      ) : null}

      <SectionHeader
        title={category ? ANNOUNCEMENT_CATEGORY_MAP[category].label : 'All Announcements'}
      />
      {announcements.length === 0 ? (
        <EmptyState
          icon="campaign"
          title="No announcements"
          message="No announcements available at the moment."
        />
      ) : (
        <View style={{ gap: sp(spacing.md) }}>
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onPress={() => openDetail(announcement.id)}
            />
          ))}
        </View>
      )}

      <Text style={[styles.note, { fontSize: sp(fontSizes.caption), marginTop: sp(spacing.lg) }]}>
        Announcements shown here are sample/demo content until the announcements
        feed is connected.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  note: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
