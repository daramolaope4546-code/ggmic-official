import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppCard } from '@/components/AppCard';
import { CardThumb } from '@/components/CardThumb';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';
import { formatLongDate, formatMonthAbbreviation, formatRelativeDay, formatShortDate } from '@/utils';

import type { ServiceProgram } from '@/types';

interface UpcomingProgramCardProps {
  service: ServiceProgram;
  /** Calculated date of this occurrence. */
  date: Date;
  onPress?: () => void;
  /**
   * Show the programme artwork and venue, with an explicit date. Off by
   * default so the Services screen keeps its compact date-chip layout.
   */
  showArtwork?: boolean;
}

/**
 * Compact, tappable row for a single calculated occurrence: a date chip (or
 * the programme artwork when `showArtwork` is set), name, relative day/time and
 * the programme's recurrence schedule. Used on the Home and Services
 * "Upcoming Programs" lists.
 */
export function UpcomingProgramCard({
  service,
  date,
  onPress,
  showArtwork = false,
}: UpcomingProgramCardProps) {
  const { sp } = useResponsive();
  const meta = [
    showArtwork ? formatShortDate(date) : formatRelativeDay(date),
    service.time,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <AppCard
      accessibilityLabel={`${service.title}, next on ${formatLongDate(date)}`}
      onPress={onPress}
    >
      <View style={[styles.row, { gap: sp(spacing.sm) }]}>
        {showArtwork && service.image ? (
          <CardThumb image={service.image} size={56} />
        ) : (
          <View
            style={[
              styles.dateChip,
              { width: sp(56), height: sp(56), borderRadius: sp(radius.md) },
            ]}
          >
            <Text style={[styles.dateMonth, { fontSize: sp(fontSizes.caption) }]}>
              {formatMonthAbbreviation(date)}
            </Text>
            <Text style={[styles.dateDay, { fontSize: sp(fontSizes.title) }]}>
              {date.getDate()}
            </Text>
          </View>
        )}

        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: sp(fontSizes.body) }]}>{service.title}</Text>
          <View style={styles.metaRow}>
            <MaterialIcons name="event-available" size={sp(14)} color={colors.textSecondary} />
            <Text style={[styles.meta, { fontSize: sp(fontSizes.caption) }]}>{meta}</Text>
          </View>
          <View style={styles.metaRow}>
            <MaterialIcons name="calendar-month" size={sp(14)} color={colors.textSecondary} />
            <Text style={[styles.meta, { fontSize: sp(fontSizes.caption) }]}>
              {service.schedule}
            </Text>
          </View>
          {showArtwork && service.location ? (
            <View style={styles.metaRow}>
              <MaterialIcons name="location-on" size={sp(14)} color={colors.textSecondary} />
              <Text
                numberOfLines={1}
                style={[styles.meta, { fontSize: sp(fontSizes.caption) }]}
              >
                {service.location}
              </Text>
            </View>
          ) : null}
        </View>

        {onPress ? (
          <MaterialIcons name="chevron-right" size={sp(22)} color={colors.textDisabled} />
        ) : null}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  dateMonth: {
    color: colors.primaryDark,
    fontWeight: fontWeights.semibold,
  },
  dateDay: {
    color: colors.primaryDark,
    fontWeight: fontWeights.bold,
    lineHeight: 26,
  },
  body: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  meta: {
    color: colors.textSecondary,
    flexShrink: 1,
  },
});
