import { useEffect, useState } from 'react';
import * as API from '../../service/api';
import type { Profile } from '../../service/types';
import { ProfileOverview } from './components/profile-overview';
import { PsnProfilesCard } from './components/psn-profiles-card';
import { RecentlyPlayed } from './components/recently-played';
import { Section } from './components/section';
import { TrophyOverview } from './components/trophy-overview';

export function Main() {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await API.getProfile();
      if (!response) {
        setHasError(true);
      } else {
        setProfile(response);
      }
    };
    getData();
  }, []);

  if (hasError) return <PsnProfilesCard />;
  return (
    <>
      <ProfileOverview profile={profile} />
      <Section title='Trophies'>
        <TrophyOverview profile={profile} />
      </Section>
      <Section title='Recently Played'>
        <RecentlyPlayed />
      </Section>
    </>
  );
}
