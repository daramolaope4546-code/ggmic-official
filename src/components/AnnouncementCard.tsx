import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppCard } from '@/components/AppCard';
import { CardThumb } from '@/components/CardThumb';
import { ANNOUNCEMENT_CATEGORY_MAP } from '@/constants/announcements';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';
import { formatDisplayDate } from '@/utils/dates';

import type { ImageSourcePropType } from 'react-native';
import type { Announcement } from '@/types';

interface AnnouncementCardProps {
  /** When no announcement is supplied the card renders an honest placeholder. */
  announcement?: Announcement;
  placeholder?: boolean;
  /** Optional section artwork shown on the placeholder instead of the icon chip. */
  image?: ImageSourcePropType;
  onPress?: () => void;
  /** Larger featured treatment with the full summary. */
  featured?: boolean;
}

/**
 * Single announcement entry. Uses the category's structured label/icon, an
 * optional local artwork thumbnail and an important/featured indicator. Missing
 * images fall back to the category icon rather than leaving an empty slot.
 */
export function AnnouncementCard({
  announcement,
  placeholder = false,
  image,
  onPress,
  featured = false,
}: AnnouncementCardProps) {
  const { sp } = useResponsive();

  if (placeholder || !announcement) {
    return (
      <AppCard accessibilityLabel="Announcements placeholder">
        <View style={[styles.row, { gap: sp(spacing.sm) }]}>
          {image ? (
            <CardThumb image={image} />
          ) : (
            <View
              style={[
                styles.iconChip,
                { width: sp(44), height: sp(44), borderRadius: sp(radius.pill) },
              ]}
            >
              <MaterialIcons name="notifications-none" size={sp(22)} color={colors.textSecondary} />
            </View>
          )}
          <View style={styles.body}>
            <Text style={[styles.title, { fontSize: sp(fontSizes.body) }]}>
              Announcements
            </Text>
            <Text style={[styles.muted, { fontSize: sp(fontSizes.small) }]}>
              No announcements at this time.
            </Text>
          </View>
        </View>
      </AppCard>
    );
  }

  const category = ANNOUNCEMENT_CATEGORY_MAP[announcement.category];
  const artwork = announcement.image ?? image;
  const meta = [formatDisplayDate(announcement.date), announcement.time]
    .filter(Boolean)
    .join(' · ');

  return (
    <AppCard accessibilityLabel={announcement.title} onPress={onPress}>
      <View style={[styles.row, featured ? styles.rowTop : null, { gap: sp(spacing.sm) }]}>
        {artwork ? (
          <CardThumb image={artwork} size={featured ? 64 : 56} />
        ) : (
          <View
            style={[
              styles.categoryChip,
              {
                width: sp(featured ? 64 : 56),
                height: sp(featured ? 64 : 56),
                borderRadius: sp(radius.md),
              },
            ]}
          >
            <MaterialIcons name={category.icon} size={sp(26)} color={colors.primaryDark} />
          </View>
        )}

        <View style={styles.body}>
          <View style={[styles.badges, { gap: sp(spacing.xxs) }]}>
            <View style={[styles.badge, styles.badgeCategory]}>
              <MaterialIcons name={category.icon} size={sp(12)} color={colors.primaryDark} />
              <Text style={[styles.badgeText, { fontSize: sp(fontSizes.caption) }]}>
                {category.label}
              </Text>
            </View>
            {announcement.isImportant ? (
              <View style={[styles.badge, styles.badgeImportant]}>
                <MaterialIcons name="priority-high" size={sp(12)} color={colors.accentDark} />
                <Text
                  style={[styles.badgeText, styles.badgeTextImportant, { fontSize: sp(fontSizes.caption) }]}
                >
                  Important
                </Text>
              </View>
            ) : null}
            {announcement.isFeatured ? (
              <View style={[styles.badge, styles.badgeFeatured]}>
                <MaterialIcons name="star" size={sp(12)} color={colors.primaryDark} />
                <Text style={[styles.badgeText, { fontSize: sp(fontSizes.caption) }]}>
                  Featured
                </Text>
              </View>
            ) : null}
          </View>

          <Text
            numberOfLines={2}
            style={[
              styles.title,
              { fontSize: sp(featured ? fontSizes.subtitle : fontSizes.body) },
            ]}
          >
            {announcement.title}
          </Text>
          <Text
            numberOfLines={featured ? 3 : 2}
            style={[styles.muted, { fontSize: sp(fontSizes.small) }]}
          >
            {announcement.shortDescription}
          </Text>
          <View style={styles.metaRow}>
            <MaterialIcons name="event" size={sp(14)} color={colors.textSecondary} />
            <Text style={[styles.meta, { fontSize: sp(fontSizes.caption) }]}>{meta}</Text>
          </View>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTop: {
    alignItems: 'flex-start',
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  categoryChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  body: {
    flex: 1,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  badgeCategory: {
    backgroundColor: colors.primarySoft,
  },
  badgeImportant: {
    backgroundColor: colors.accentSoft,
  },
  badgeFeatured: {
    backgroundColor: colors.primarySoftDark,
  },
  badgeText: {
    color: colors.primaryDark,
    fontWeight: fontWeights.semibold,
  },
  badgeTextImportant: {
    color: colors.accentDark,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
    marginBottom: 2,
  },
  muted: {
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
    flexShrink: 1,
  },
});
