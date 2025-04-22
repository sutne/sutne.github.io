import { useEffect, useState } from 'react';
import * as API from '../service/api';
import type { Profile, RecentGame } from '../service/types';
import {
  ProfileOverview,
  ProfileOverviewShimmer,
} from './components/ProfileOverview';
import { PsnProfilesCard } from './components/PsnProfilesCard';
import {
  RecentlyPlayedGames,
  RecentlyPlayedGamesShimmer,
} from './components/RecentlyPlayedGames';
import { Section } from './components/Section';
import {
  TrophyOverview,
  TrophyOverviewShimmer,
} from './components/TrophyOverview';

export function Main() {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [recentGames, setRecentGames] = useState<RecentGame[]>([]);
  const [isLoadingRecentGames, setIsLoadingRecentGames] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoadingProfile(true);
      const response = await API.getProfile();
      if (!response) {
        setHasError(true);
      } else {
        setProfile(response);
      }
      setIsLoadingProfile(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoadingRecentGames(true);
      const response = await API.getRecentGames();
      if (!response) {
        setHasError(true);
      } else {
        setRecentGames(response);
      }
      setIsLoadingRecentGames(false);
    };
    getData();
  }, []);

  if (hasError) return <PsnProfilesCard />;
  return (
    <>
      {isLoadingProfile ? (
        <ProfileOverviewShimmer />
      ) : !profile ? (
        <></>
      ) : (
        <ProfileOverview profile={profile} />
      )}

      <Section title='Trophies'>
        {isLoadingProfile ? (
          <TrophyOverviewShimmer />
        ) : !profile ? (
          <></>
        ) : (
          <TrophyOverview profile={profile} />
        )}
      </Section>

      <Section title='Recently Played'>
        {isLoadingRecentGames ? (
          <RecentlyPlayedGamesShimmer />
        ) : !recentGames ? (
          <></>
        ) : (
          <RecentlyPlayedGames recentGames={recentGames} />
        )}
      </Section>
    </>
  );
}
