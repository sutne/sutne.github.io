import { CircularProgress, Stack } from '@mui/material';
import { SortButton } from 'components/sort-button';
import { useSorting } from 'providers/sort-provider';
import { useEffect, useState } from 'react';
import * as API from '../service/api';
import type { RepoType } from '../service/types';
import { sortRepos } from '../util';
import { Repository } from './repo';

export function RepoList() {
  const [repos, setRepos] = useState<RepoType[]>([]);
  const { sorting } = useSorting();

  useEffect(() => {
    const getData = async () => {
      const personalRepos = await API.getRepositories();
      if (!personalRepos) return;
      setRepos(sortRepos(personalRepos, sorting));
    };
    getData();
  }, []);

  useEffect(() => {
    setRepos((repos) => sortRepos([...repos], sorting));
  }, [sorting]);

  if (repos.length === 0) return <CircularProgress />;
  return (
    <>
      <Stack
        sx={{
          marginBottom: '3mm',
          overflow: 'hidden',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '0',
          },
        }}
        direction='row'
        spacing={1}
        alignItems={'center'}
      >
        <SortButton type='Updated' />
        <SortButton type='Created' />
        <SortButton type='Name' />
        <SortButton type='Language' />
      </Stack>
      <Stack direction='column' spacing={1}>
        {repos.map((repo) => (
          <Repository key={repo.href} repo={repo} />
        ))}
      </Stack>
    </>
  );
}
