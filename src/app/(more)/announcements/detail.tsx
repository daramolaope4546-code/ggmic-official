import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

import {
  AppCard,
  AppHeader,
  EmptyState,
  FactRow,
  ScreenContainer,
  SectionHero,
} from '@/components';
import { ANNOUNCEMENT_CATEGORY_MAP } from '@/constants/announcements';
import { useResponsive } from '@/hooks/useResponsive';
import { getAnnouncement } from '@/services/announcements';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';
import { formatDisplayDate } from '@/utils';

/**
 * Announcement detail: artwork, category, dates and the full description.
 * Optional fields (time, venue, date range) are only rendered when supplied so
 * no empty labels are ever shown.
 */
export default function AnnouncementDetailScreen() {
  const { sp } = useResponsive();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const announcement = id ? getAnnouncement(id) : undefined;

  if (!announcement) {
    return (
      <ScreenContainer scroll={false} centered>
        <AppHeader title="Announcement" showBack />
        <EmptyState
          icon="campaign"
          title="Announcement not found"
          message="This announcement could not be found. Go back and choose another."
        />
      </ScreenContainer>
    );
  }

  const category = ANNOUNCEMENT_CATEGORY_MAP[announcement.category];
  const isSample = announcement.title.startsWith('Sample');
  const hasRange = Boolean(announcement.startDate && announcement.endDate);
  const dateValue = hasRange
    ? `${formatDisplayDate(announcement.startDate!)} – ${formatDisplayDate(announcement.endDate!)}`
    : formatDisplayDate(announcement.date);

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Announcement" showBack />

      <View style={{ marginTop: sp(spacing.xs), gap: sp(spacing.md) }}>
        {announcement.image ? (
          <SectionHero
            image={announcement.image}
            aspectRatio={announcement.imageAspectRatio}
            maxWidth={240}
          />
        ) : null}

        <AppCard>
          <Text style={[styles.title, { fontSize: sp(fontSizes.heading), lineHeight: sp(34) }]}>
            {announcement.title}
          </Text>
          {announcement.isImportant || announcement.isFeatured ? (
            <View style={[styles.flags, { gap: sp(spacing.xs), marginTop: sp(spacing.sm) }]}>
              {announcement.isImportant ? (
                <View style={[styles.flag, styles.flagImportant]}>
                  <MaterialIcons name="priority-high" size={sp(12)} color={colors.accentDark} />
                  <Text style={[styles.flagText, styles.flagTextImportant, { fontSize: sp(fontSizes.caption) }]}>
                    Important
                  </Text>
                </View>
              ) : null}
              {announcement.isFeatured ? (
                <View style={[styles.flag, styles.flagFeatured]}>
                  <MaterialIcons name="star" size={sp(12)} color={colors.primaryDark} />
                  <Text style={[styles.flagText, { fontSize: sp(fontSizes.caption) }]}>
                    Featured
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </AppCard>

        <AppCard>
          <FactRow label="Category" value={category.label} hideDivider />
          <FactRow label={hasRange ? 'Dates' : 'Date'} value={dateValue} />
          {announcement.time ? <FactRow label="Time" value={announcement.time} /> : null}
          {announcement.location ? (
            <FactRow label="Venue" value={announcement.location} />
          ) : null}
        </AppCard>

        <AppCard>
          <Text style={[styles.section, { fontSize: sp(fontSizes.subtitle) }]}>Details</Text>
          <Text
            style={[styles.description, { fontSize: sp(fontSizes.body), lineHeight: sp(26) }]}
          >
            {announcement.fullDescription}
          </Text>
        </AppCard>

        {isSample ? (
          <View style={[styles.sampleNote, { borderRadius: sp(radius.lg) }]}>
            <MaterialIcons name="info" size={sp(16)} color={colors.textSecondary} />
            <Text style={[styles.sampleText, { fontSize: sp(fontSizes.small), lineHeight: sp(20) }]}>
              This is sample/demo content. Official announcements will appear here
              once the announcements feed is connected.
            </Text>
          </View>
        ) : null}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  flags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  flagImportant: {
    backgroundColor: colors.accentSoft,
  },
  flagFeatured: {
    backgroundColor: colors.primarySoftDark,
  },
  flagText: {
    color: colors.primaryDark,
    fontWeight: fontWeights.semibold,
  },
  flagTextImportant: {
    color: colors.accentDark,
  },
  section: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textSecondary,
  },
  sampleNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.md,
  },
  sampleText: {
    flex: 1,
    color: colors.textSecondary,
  },
});
