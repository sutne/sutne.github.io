import React, { useEffect, useState } from 'react';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';
import { Box, Stack, Typography, useTheme } from '@mui/material';

import * as API from '../service/api';
import { RepoType } from '../service/types';
import { SortOrder, SortOrderSort, sortRepos } from '../util';
import { Repository } from './repo';

export function RepoList() {
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    sort: 'Updated',
    order: 'asc',
  });

  const theme = useTheme();

  useEffect(() => {
    const getData = async () => {
      const personalRepos = await API.getRepositories();
      if (!personalRepos) return;
      setRepos(sortRepos(personalRepos, sortOrder));
    };
    getData();
  }, []);

  useEffect(() => {
    setRepos((repos) => sortRepos([...repos], sortOrder));
  }, [sortOrder]);

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
        <SortButton order='Updated' />
        <SortButton order='Created' />
        <SortButton order='Name' />
        <SortButton order='Language' />
      </Stack>
      <Stack direction='column' spacing={1}>
        {repos.map((repo, i) => (
          <Repository key={i} repo={repo} />
        ))}
      </Stack>
    </>
  );

  type prp = {
    order: SortOrderSort;
  };
  function SortButton({ order }: prp) {
    const handleClick = () => {
      if (sortOrder.sort == order) {
        setSortOrder({
          sort: order,
          order: sortOrder.order == 'asc' ? 'desc' : 'asc',
        });
      } else {
        setSortOrder({
          sort: order,
          order: 'asc',
        });
      }
    };

    const sx = getSx();

    const icon = () => {
      if (sortOrder.sort != order) return <></>;
      return sortOrder.order == 'asc' ? (
        <KeyboardArrowDownRounded sx={sx.label} />
      ) : (
        <KeyboardArrowUpRounded sx={sx.label} />
      );
    };

    return (
      <Box sx={sx.button} onClick={handleClick}>
        <Stack
          sx={sx.content}
          direction='row'
          spacing={1}
          alignItems={'center'}
        >
          {icon()}
          <Typography sx={sx.label} variant='body2'>
            {order}
          </Typography>
        </Stack>
      </Box>
    );
    function getSx() {
      return {
        button: [
          {
            border: '1px dashed',
            color: theme.palette.text.secondary,
            borderRadius: '20px',
            backgroundColor: 'background.default',
            '&:hover': {
              backgroundColor: 'background.paper',
              color: theme.palette.text.primary,
            },
            cursor: 'pointer',
          },
          order == sortOrder.sort && {
            border: '1px solid',
          },
        ],
        label: [
          order == sortOrder.sort && {
            color: 'text.primary',
          },
        ],
        content: [
          {
            margin: '1mm 4mm 1mm 4mm',
          },
        ],
      };
    }
  }
}
