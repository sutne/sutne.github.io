import React from 'react';
import { alpha, Box, Collapse, Stack, Typography } from '@mui/material';

import { useTheme } from 'providers/theme-provider';

import { LanguageColorMap, RepoType } from '../service/types';
import { toTimeDiffString } from '../util';
import { RepoCard } from './card';
import { LanguageBar } from './language-bar';

type props = {
  repo: RepoType;
};
export function Repository({ repo }: props) {
  const [expanded, setExpanded] = React.useState(false);

  const { theme } = useTheme();

  // find language with highest value
  const dominantLanguage = Object.keys(repo.languages).reduce(
    (a, b) => (repo.languages[a] > repo.languages[b] ? a : b),
    '',
  );

  const sx = getSx();
  return (
    <Box sx={sx.wrapper} onClick={() => setExpanded((prev) => !prev)}>
      <RepoCard>
        <>
          <Stack direction='row' spacing={2}>
            <Box sx={sx.owner} component='img' src={repo.owner.image} />
            <Typography sx={sx.name}>{repo.name}</Typography>
            <Box sx={sx.dominantLanguage}>{dominantLanguage}</Box>
            <Box sx={sx.private}>{repo.isPrivate ? 'Private' : 'Public'}</Box>
          </Stack>
          <Collapse in={expanded} timeout={200}>
            <Typography sx={sx.description}>{repo.description}</Typography>
            <Typography sx={sx.timestamp}>
              Created {toTimeDiffString(repo.createdAt)}
            </Typography>
            <Typography sx={sx.timestamp}>
              Updated {toTimeDiffString(repo.updatedAt)}
            </Typography>
            <LanguageBar size={repo.size} languages={repo.languages} />
          </Collapse>
        </>
      </RepoCard>
    </Box>
  );

  function getSx() {
    return {
      name: [
        {
          color: 'text.primary',
          fontWeight: 500,
          fontSize: '1.3rem',
          marginBottom: '4px',
          alignSelf: 'center',
        },
      ],
      description: {
        color: 'text.secondary',
        fontWeight: 300,
        fontSize: '0.9rem',
      },
      private: {
        position: 'absolute',
        right: '16px',
        alignSelf: 'center',
        width: 'fit-content',
        padding: '4px 8px',
        bgcolor: 'background.paper',
        border: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
        borderRadius: '0.9rem',
        color: 'text.secondary',
        fontWeight: 500,
        fontSize: '0.9rem',
      },
      owner: {
        height: '36px',
        width: '36px',
        borderRadius: '50%',
      },
      timestamp: {
        color: 'text.secondary',
      },
      dominantLanguage: {
        transition: 'opacity 0.2s ease-in-out',
        opacity: expanded ? '0' : '1',
        alignSelf: 'center',
        width: 'fit-content',
        padding: '4px 8px',
        bgcolor: 'background.paper',
        '&:before': {
          content: '""',
          display: 'inline-block',
          height: '1rem',
          width: '1rem',
          borderRadius: '50%',
          marginRight: '4px',
          backgroundColor: LanguageColorMap[dominantLanguage],
        },
      },
      wrapper: {
        '& > * ::selection': {
          background: 'transparent',
        },
      },
    };
  }
}
