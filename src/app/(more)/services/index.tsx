import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  AppCard,
  AppHeader,
  ScreenContainer,
  SectionHeader,
  SectionHero,
  ServiceCard,
  UpcomingProgramCard,
} from '@/components';
import { APP } from '@/constants/app';
import { SERVICE_GROUPS } from '@/constants/services';
import { useResponsive } from '@/hooks/useResponsive';
import { getServices, getUpcomingServices } from '@/services/programs';
import { colors, fontSizes, spacing } from '@/theme';

/**
 * Services & Programs: the confirmed GGMIC programme, grouped into weekly,
 * monthly and seasonal recurrences. Data comes from the programs service so a
 * later API/CMS can replace it without touching the UI and additional official
 * services render automatically.
 */
export default function ServicesScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const services = getServices();
  const upcoming = getUpcomingServices(new Date(), 4);

  return (
    <ScreenContainer scroll centered>
      <AppHeader
        title="Services & Programs"
        subtitle="Weekly, monthly & special"
        showBack
      />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <SectionHero image={require('../../../../assets/images/menu/menu-ministries.png')} />
      </View>

      <View style={{ marginTop: sp(spacing.md) }}>
        <AppCard>
          <Text style={[styles.intro, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
            Join us at {APP.organizationLong} for worship, the study of the word
            and prayer. Our weekly, monthly and special programmes are listed
            below.
          </Text>
        </AppCard>
      </View>

      {upcoming.length > 0 ? (
        <>
          <SectionHeader
            title="Upcoming Programs"
            actionLabel="Calendar"
            onActionPress={() => router.push('/services/calendar')}
            image={require('../../../../assets/images/core-icons/upcoming-event.png')}
          />
          <View style={{ gap: sp(spacing.md) }}>
            {upcoming.map(({ service, date }) => (
              <UpcomingProgramCard
                key={`${service.id}-${date.toISOString()}`}
                service={service}
                date={date}
                onPress={() =>
                  router.push({ pathname: '/services/detail', params: { id: service.id } })
                }
              />
            ))}
          </View>
        </>
      ) : null}

      {SERVICE_GROUPS.map(({ recurrence, title }) => {
        const group = services.filter((service) => service.recurrence === recurrence);
        if (group.length === 0) return null;

        return (
          <View key={recurrence}>
            <SectionHeader title={title} />
            <View style={{ gap: sp(spacing.md) }}>
              {group.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  highlighted={false}
                  onPress={() =>
                    router.push({ pathname: '/services/detail', params: { id: service.id } })
                  }
                />
              ))}
            </View>
          </View>
        );
      })}

      <Text style={[styles.note, { fontSize: sp(fontSizes.caption), marginTop: sp(spacing.lg) }]}>
        This schedule reflects the officially confirmed gatherings. Additional
        programmes will be listed here when announced.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: {
    color: colors.textSecondary,
  },
  note: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
