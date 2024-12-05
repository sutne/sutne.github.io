import { CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as API from '../service/api';
import type { LanguageStatsType } from '../service/types';
import { RepoCard } from './card';
import { LanguageBar } from './language-bar';

export function LanguagesCard() {
  const [data, setData] = useState<LanguageStatsType | undefined>();

  useEffect(() => {
    const getData = async () => {
      const response = await API.getLanguageStats();
      if (!response) return;
      setData(response);
    };
    getData();
  }, []);

  if (!data) return <CircularProgress />;

  return (
    <RepoCard>
      <Stack direction='column' spacing={1}>
        <Typography variant='h4' style={{ marginBottom: '8mm' }}>
          Languages Statistics
        </Typography>
        <LanguageBar
          size={data.total}
          languages={data.languages}
          height={16}
          textSize={14}
        />
      </Stack>
    </RepoCard>
  );
}
