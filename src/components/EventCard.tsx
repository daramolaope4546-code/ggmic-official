import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppCard } from '@/components/AppCard';
import { CardThumb } from '@/components/CardThumb';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';
import { formatDisplayDate } from '@/utils/dates';

import type { ImageSourcePropType } from 'react-native';
import type { ChurchEvent } from '@/types';

interface EventCardProps {
  /** When no event is supplied the card renders an honest placeholder. */
  event?: ChurchEvent;
  placeholder?: boolean;
  onPress?: () => void;
  /** Optional section artwork shown on the placeholder instead of the icon chip. */
  image?: ImageSourcePropType;
}

/** Single event entry. Reusable for lists or the Home "Upcoming Event" slot. */
export function EventCard({ event, placeholder = false, onPress, image }: EventCardProps) {
  const { sp } = useResponsive();

  if (placeholder || !event) {
    return (
      <AppCard accessibilityLabel="Upcoming events placeholder">
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
              <MaterialIcons name="event-note" size={sp(22)} color={colors.textSecondary} />
            </View>
          )}
          <View style={styles.body}>
            <Text style={[styles.title, { fontSize: sp(fontSizes.body) }]}>
              Upcoming Event
            </Text>
            <Text style={[styles.muted, { fontSize: sp(fontSizes.small) }]}>
              No upcoming events at this time.
            </Text>
          </View>
        </View>
      </AppCard>
    );
  }

  return (
    <AppCard accessibilityLabel={event.title} onPress={onPress}>
      <View style={[styles.row, { gap: sp(spacing.sm) }]}>
        <View
          style={[
            styles.dateChip,
            { width: sp(56), height: sp(56), borderRadius: sp(radius.md) },
          ]}
        >
          <Text style={[styles.dateDay, { fontSize: sp(fontSizes.title) }]}>
            {formatDay(event.date)}
          </Text>
          <Text style={[styles.dateMonth, { fontSize: sp(fontSizes.caption) }]}>
            {formatMonth(event.date)}
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: sp(fontSizes.body) }]}>{event.title}</Text>
          <View style={styles.metaRow}>
            <MaterialIcons name="schedule" size={sp(14)} color={colors.textSecondary} />
            <Text style={[styles.meta, { fontSize: sp(fontSizes.caption) }]}>
              {[formatDisplayDate(event.date), event.time].filter(Boolean).join(' · ') || 'Date to be announced'}
            </Text>
          </View>
          {event.category ? (
            <View style={styles.metaRow}>
              <MaterialIcons name="label" size={sp(14)} color={colors.textSecondary} />
              <Text style={[styles.meta, { fontSize: sp(fontSizes.caption) }]}>{event.category}</Text>
            </View>
          ) : null}
          {event.location ? (
            <View style={styles.metaRow}>
              <MaterialIcons name="location-on" size={sp(14)} color={colors.textSecondary} />
              <Text style={[styles.meta, { fontSize: sp(fontSizes.caption) }]} numberOfLines={1}>{event.location}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </AppCard>
  );
}

function parseDate(date: string): Date | null {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDay(date: string): string {
  const d = parseDate(date);
  return d ? String(d.getDate()) : '--';
}

function formatMonth(date: string): string {
  const d = parseDate(date);
  return d ? d.toLocaleString('en', { month: 'short' }).toUpperCase() : '';
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  dateChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  dateDay: {
    color: colors.primaryDark,
    fontWeight: fontWeights.bold,
    lineHeight: 26,
  },
  dateMonth: {
    color: colors.primaryDark,
    fontWeight: fontWeights.semibold,
  },
  body: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
    marginBottom: 2,
  },
  muted: {
    color: colors.textSecondary,
    marginTop: 2,
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