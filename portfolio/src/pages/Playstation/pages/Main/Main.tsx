import React from 'react';

import * as API from '../../service/api';
import { Profile } from '../../service/types';
import { ProfileOverview } from './components/profile-overview';
import { RecentlyPlayed } from './components/recently-played';
import { Section } from './components/section';
import { TrophyOverview } from './components/trophy-overview';

export function Main() {
  const [profile, setProfile] = React.useState<Profile | undefined>();

  React.useEffect(() => {
    const getData = async () => {
      const response = await API.getProfile();
      if (!response) return;
      setProfile(response);
    };
    getData();
  }, []);

  if (!profile) return <></>;
  return (
    <>
      <ProfileOverview profile={profile} />
      <Section title='Trophies'>
        <TrophyOverview profile={profile} />
      </Section>
      <Section title='Recently Played' padding='8px'>
        <RecentlyPlayed />
      </Section>
    </>
  );
}
