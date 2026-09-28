import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppCard } from '@/components/AppCard';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';

import type { Announcement } from '@/types';

interface AnnouncementCardProps {
  /** When no announcement is supplied the card renders an honest placeholder. */
  announcement?: Announcement;
  placeholder?: boolean;
}

/** Announcement/banner entry with icon and optional date. */
export function AnnouncementCard({ announcement, placeholder = false }: AnnouncementCardProps) {
  const { sp } = useResponsive();
  const hasAnnouncement = !placeholder && announcement;

  return (
    <AppCard accessibilityLabel={hasAnnouncement ? announcement?.title : 'Announcements placeholder'}>
      <View style={[styles.row, { gap: sp(spacing.sm) }]}>
        <View
          style={[
            styles.iconChip,
            { width: sp(44), height: sp(44), borderRadius: sp(radius.pill) },
          ]}
        >
          <MaterialIcons
            name={hasAnnouncement ? 'campaign' : 'notifications-none'}
            size={sp(22)}
            color={hasAnnouncement ? colors.accentDark : colors.textSecondary}
          />
        </View>
        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: sp(fontSizes.body) }]}>
            {hasAnnouncement ? announcement.title : 'Announcements'}
          </Text>
          <Text style={[styles.muted, { fontSize: sp(fontSizes.small) }]}>
            {hasAnnouncement
              ? announcement.message
              : 'No announcements at this time.'}
          </Text>
          {hasAnnouncement && announcement.date ? (
            <Text style={[styles.date, { fontSize: sp(fontSizes.caption) }]}>
              {announcement.date}
            </Text>
          ) : null}
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
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
  },
  body: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
  },
  muted: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  date: {
    color: colors.textSecondary,
    marginTop: 4,
  },
});