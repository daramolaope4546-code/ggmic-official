import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import {
  AppCard,
  AppHeader,
  EmptyState,
  FactRow,
  ScreenContainer,
  SectionHero,
} from '@/components';
import { SERVICE_RECURRENCE_LABELS } from '@/constants/services';
import { useResponsive } from '@/hooks/useResponsive';
import { getNextOccurrenceFor, getService, getServiceOccurrences } from '@/services/programs';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';
import { formatLongDate, formatRelativeDay } from '@/utils';

/**
 * Service detail: artwork, confirmed schedule and, when supplied, the official
 * description. Missing times/descriptions show honest placeholders rather than
 * invented copy.
 */
export default function ServiceDetailScreen() {
  const { sp } = useResponsive();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const service = id ? getService(id) : undefined;

  if (!service) {
    return (
      <ScreenContainer scroll={false} centered>
        <AppHeader title="Service" showBack />
        <EmptyState
          icon="event-available"
          title="Service not found"
          message="This service could not be found. Go back and choose another."
        />
      </ScreenContainer>
    );
  }

  const summary = [service.schedule, service.time].filter(Boolean).join(' · ');
  const nextOccurrence = getNextOccurrenceFor(service);
  const upcomingDates = getServiceOccurrences(service, new Date(), 4);

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Service Details" showBack />

      <View style={{ marginTop: sp(spacing.xs), gap: sp(spacing.md) }}>
        {service.image ? (
          <SectionHero image={service.image} aspectRatio={service.imageAspectRatio} maxWidth={240} />
        ) : null}

        <AppCard>
          <Text style={[styles.title, { fontSize: sp(fontSizes.heading), lineHeight: sp(34) }]}>
            {service.title}
          </Text>
          <Text style={[styles.schedule, { fontSize: sp(fontSizes.body), marginTop: sp(spacing.xs) }]}>
            {summary}
          </Text>
        </AppCard>

        <AppCard>
          <FactRow label="Schedule" value={service.schedule} hideDivider />
          {nextOccurrence ? (
            <FactRow
              label="Next occurrence"
              value={`${formatLongDate(nextOccurrence)} (${formatRelativeDay(nextOccurrence)})`}
            />
          ) : null}
          <FactRow label="Time" value={service.time ?? 'To be announced'} />
          <FactRow label="Repeats" value={SERVICE_RECURRENCE_LABELS[service.recurrence]} />
          {service.location ? <FactRow label="Venue" value={service.location} /> : null}
        </AppCard>

        {upcomingDates.length > 0 ? (
          <AppCard>
            <Text style={[styles.section, { fontSize: sp(fontSizes.subtitle) }]}>
              Upcoming dates
            </Text>
            {upcomingDates.map((date, index) => (
              <FactRow
                key={date.toISOString()}
                label={formatRelativeDay(date)}
                value={formatLongDate(date)}
                hideDivider={index === 0}
              />
            ))}
          </AppCard>
        ) : null}

        <AppCard>
          <Text style={[styles.section, { fontSize: sp(fontSizes.subtitle) }]}>
            About this service
          </Text>
          {service.description ? (
            <Text
              style={[styles.description, { fontSize: sp(fontSizes.body), lineHeight: sp(26) }]}
            >
              {service.description}
            </Text>
          ) : (
            <Text style={[styles.placeholder, { fontSize: sp(fontSizes.body) }]}>
              More information will be added.
            </Text>
          )}
        </AppCard>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  schedule: {
    color: colors.primaryDark,
    fontWeight: fontWeights.semibold,
  },
  section: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textSecondary,
  },
  placeholder: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
