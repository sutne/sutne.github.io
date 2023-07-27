import React from 'react';
import { CircularProgress } from '@mui/material';

import * as API from '../../service/api';
import { Profile } from '../../service/types';

import { ProfileOverview } from './components/profile-overview';
import { PsnProfilesCard } from './components/psn-profiles-card';
import { RecentlyPlayed } from './components/recently-played';
import { Section } from './components/section';
import { TrophyOverview } from './components/trophy-overview';

export function Main() {
  const [profile, setProfile] = React.useState<Profile | undefined>();
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      const response = await API.getProfile();
      if (!response || !response.onlineId) {
        setHasError(true);
      }
      setProfile(response);
    };
    getData();
  }, []);

  if (hasError) return <PsnProfilesCard />;
  if (!profile) return <CircularProgress />;
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
