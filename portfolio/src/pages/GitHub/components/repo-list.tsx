import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';

import * as API from '../service/api';
import { RepoType } from '../service/types';
import { Repository } from './repo';

export function RepoList() {
  const [repos, setRepos] = useState<RepoType[]>([]);

  // Effects
  useEffect(() => {
    const getData = async () => {
      const response = await API.getRepositories();
      if (!response) return;
      setRepos(response);
    };
    getData();
  }, []);

  return (
    <Stack direction='column' spacing={1}>
      {repos.map((repo, i) => (
        <Repository key={i} repo={repo} />
      ))}
    </Stack>
  );
}
