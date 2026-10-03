import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import {
  AboutLinkCard,
  AnnouncementCard,
  AppButton,
  AppCard,
  GGMICBrand,
  HomeHeader,
  NextProgramCard,
  QuickAccessCard,
  ScreenContainer,
  SectionHeader,
  SermonCard,
  UpcomingProgramCard,
  WelcomeHero,
} from '@/components';
import { APP } from '@/constants/app';
import { MAIN_BRANCH } from '@/constants/branches';
import { MENU_SECTIONS } from '@/constants/menu';
import { QUICK_ACCESS } from '@/constants/quickAccess';
import { useResponsive } from '@/hooks/useResponsive';
import { getLatestAnnouncements } from '@/services/announcements';
import { getUpcomingServices } from '@/services/programs';
import { getFeaturedSermon, getSermons } from '@/services/sermons';
import { colors, contentMaxWidth, fontSizes, fontWeights, gridGap, radius, spacing } from '@/theme';
import { gridItemWidth } from '@/utils';

import type { ImageSourcePropType } from 'react-native';
import type { MenuItem } from '@/types';

const ABOUT_LINK_IDS = ['our-history', 'mission', 'vision', 'motto', 'founder', 'general-overseer'];
const ABOUT_COLUMNS = 3;

type AboutLink = MenuItem & { image: ImageSourcePropType };

/** Reuse the Menu's About entries so the Home grid never duplicates route data. */
function getAboutLinks(): AboutLink[] {
  const about = MENU_SECTIONS.find((section) => section.id === 'about');
  if (!about) return [];

  return ABOUT_LINK_IDS.map((id) => about.items.find((item) => item.id === id)).filter(
    (item): item is AboutLink => Boolean(item?.image),
  );
}

/**
 * Home landing page: branded header and hero, the dynamically calculated next
 * program, quick access, upcoming programs, latest sermon and announcements,
 * plus concise About and Branches sections. All data comes from the shared
 * constants/services so nothing is duplicated or invented.
 */
export default function HomeScreen() {
  const router = useRouter();
  const { sp, columns, contentWidth } = useResponsive();
  const gap = sp(gridGap);
  const usableContentWidth = Math.min(contentWidth, contentMaxWidth);
  const tileWidth = gridItemWidth(columns, gap, usableContentWidth);
  const aboutWidth = gridItemWidth(ABOUT_COLUMNS, gap, usableContentWidth);

  const upcoming = getUpcomingServices(new Date(), 5);
  const [nextProgram, ...restPrograms] = upcoming;
  const upcomingPrograms = restPrograms.slice(0, 3);
  const aboutLinks = getAboutLinks();

  const sermons = getSermons();
  const latestSermon = getFeaturedSermon() ?? sermons[0];
  const announcements = getLatestAnnouncements(2);

  return (
    <ScreenContainer scroll centered>
      <HomeHeader />

      <View style={{ marginTop: sp(spacing.sm) }}>
        <WelcomeHero onExplore={() => router.push('/about')} />
      </View>

      {nextProgram ? (
        <>
          <SectionHeader
            title="Next Program"
            image={require('../../../assets/images/core-icons/upcoming-event.png')}
          />
          <NextProgramCard
            service={nextProgram.service}
            date={nextProgram.date}
            onPress={() =>
              router.push({
                pathname: '/services/detail',
                params: { id: nextProgram.service.id },
              })
            }
          />
        </>
      ) : null}

      <SectionHeader
        title="Quick Access"
        image={require('../../../assets/images/core-icons/home.png')}
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap }}>
        {QUICK_ACCESS.map((item) => (
          <View key={item.id} style={{ width: tileWidth }}>
            <QuickAccessCard
              label={item.label}
              image={item.image}
              onPress={() => router.push(item.route)}
            />
          </View>
        ))}
      </View>

      {upcomingPrograms.length > 0 ? (
        <>
          <SectionHeader
            title="Upcoming Programs"
            actionLabel="View All"
            onActionPress={() => router.push('/services')}
            image={require('../../../assets/images/core-icons/upcoming-event.png')}
          />
          <View style={{ gap: sp(spacing.md) }}>
            {upcomingPrograms.map(({ service, date }) => (
              <UpcomingProgramCard
                key={`${service.id}-${date.toISOString()}`}
                service={service}
                date={date}
                showArtwork
                onPress={() =>
                  router.push({ pathname: '/services/detail', params: { id: service.id } })
                }
              />
            ))}
          </View>
        </>
      ) : null}

      <SectionHeader
        title="Latest Sermon"
        actionLabel="View All Sermons"
        onActionPress={() => router.push('/sermons')}
        image={require('../../../assets/images/core-icons/latest-sermon.png')}
      />
      {latestSermon ? (
        <SermonCard
          sermon={latestSermon}
          image={require('../../../assets/images/core-icons/latest-sermon.png')}
          onPress={() =>
            router.push({ pathname: '/sermons/detail', params: { id: latestSermon.id } })
          }
        />
      ) : (
        <SermonCard
          placeholder
          image={require('../../../assets/images/core-icons/latest-sermon.png')}
        />
      )}

      <SectionHeader
        title="Latest Announcements"
        actionLabel="View all"
        onActionPress={() => router.push('/announcements')}
        image={require('../../../assets/images/core-icons/announcement.png')}
      />
      {announcements.length === 0 ? (
        <AnnouncementCard
          placeholder
          image={require('../../../assets/images/core-icons/announcement.png')}
        />
      ) : (
        <View style={{ gap: sp(spacing.md) }}>
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onPress={() =>
                router.push({
                  pathname: '/announcements/detail',
                  params: { id: announcement.id },
                })
              }
            />
          ))}
        </View>
      )}

      <SectionHeader
        title="About GGMIC"
        actionLabel="Learn more"
        onActionPress={() => router.push('/about')}
        image={require('../../../assets/images/core-icons/home.png')}
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap }}>
        {aboutLinks.map((link) => (
          <View key={link.id} style={{ width: aboutWidth }}>
            <AboutLinkCard
              label={link.label}
              image={link.image}
              onPress={() => router.push(link.route)}
            />
          </View>
        ))}
      </View>

      <SectionHeader
        title="Our Branches"
        image={require('../../../assets/images/menu/menu-branches.png')}
      />
      <AppCard>
        <View style={[styles.branchRow, { gap: sp(spacing.sm) }]}>
          <View
            style={[
              styles.branchIcon,
              { width: sp(48), height: sp(48), borderRadius: sp(radius.pill) },
            ]}
          >
            <MaterialIcons name="location-city" size={sp(24)} color={colors.primary} />
          </View>
          <View style={styles.branchBody}>
            <Text style={[styles.branchName, { fontSize: sp(fontSizes.body) }]}>
              {MAIN_BRANCH.name}
            </Text>
            <Text style={[styles.branchAddress, { fontSize: sp(fontSizes.small) }]}>
              {[MAIN_BRANCH.addressLine, MAIN_BRANCH.city, MAIN_BRANCH.state].join(', ')}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: sp(spacing.md) }}>
          <AppButton
            title="View Branches"
            icon="location-on"
            variant="secondary"
            fullWidth
            onPress={() => router.push('/branches')}
          />
        </View>
      </AppCard>

      <View style={[styles.footer, { marginTop: sp(spacing.xxl), gap: sp(spacing.sm) }]}>
        <GGMICBrand size={88} />
        <Text style={[styles.footerText, { fontSize: sp(fontSizes.caption) }]}>
          {APP.mainLocation}
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  branchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  branchBody: {
    flex: 1,
  },
  branchName: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  branchAddress: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.xl,
  },
  footerText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
