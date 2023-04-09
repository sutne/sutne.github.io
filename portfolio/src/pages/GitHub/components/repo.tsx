import React from 'react';
import { LinkRounded } from '@mui/icons-material';
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
          <Box sx={sx.titleRow}>
            <Box sx={sx.owner} component='img' src={repo.owner.image} />
            <Typography sx={sx.name}>{repo.name}</Typography>
            <Box sx={sx.dominantLanguage}>{dominantLanguage}</Box>
            <Box
              sx={sx.private}
              onClick={() => (repo.isPrivate ? null : open(repo.href))}
            >
              {repo.isPrivate ? (
                <></>
              ) : (
                <LinkRounded sx={{ marginRight: '5px' }} />
              )}
              {repo.isPrivate ? 'Private' : 'Public'}
            </Box>
          </Box>
          <Collapse in={expanded} timeout={200}>
            <Stack sx={sx.info} direction='row'>
              <Typography sx={sx.description}>{repo.description}</Typography>
              <Stack sx={sx.metadata}>
                <Typography sx={sx.timestamp}>
                  Created {toTimeDiffString(repo.createdAt)}
                </Typography>
                <Typography sx={sx.timestamp}>
                  Updated {toTimeDiffString(repo.updatedAt)}
                </Typography>
              </Stack>
            </Stack>
            <LanguageBar size={repo.size} languages={repo.languages} />
          </Collapse>
        </>
      </RepoCard>
    </Box>
  );

  function getSx() {
    return {
      wrapper: {
        cursor: expanded ? 'default' : 'pointer',
        '& > * ::selection': {
          background: 'transparent',
        },
      },
      titleRow: {
        display: 'flex',
        alignItems: 'center',
      },
      name: [
        {
          color: 'text.primary',
          flex: 1,
          fontWeight: 500,
          fontSize: { xs: '1rem', sm: '1.3rem' },
          marginBottom: '4px',
          alignSelf: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: '100%',
        },
      ],
      owner: {
        height: '36px',
        width: '36px',
        marginRight: '16px',
        borderRadius: '50%',
      },
      dominantLanguage: {
        transition: 'opacity 0.2s ease-in-out',
        opacity: expanded ? '0' : '1',
        margin: '0 12px',
        bgcolor: 'background.paper',
        '&:after': {
          content: '""',
          display: 'inline-block',
          position: 'relative',
          top: '2px',
          height: '1rem',
          width: '1rem',
          marginLeft: '12px',
          borderRadius: '50%',
          backgroundColor: LanguageColorMap[dominantLanguage],
        },
      },
      private: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '76px',
        padding: '4px 8px',
        fontSize: '0.9rem',
        fontWeight: 500,
        bgcolor: 'background.paper',
        border: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
        borderRadius: '0.9rem',
        color: repo.isPrivate ? theme.palette.error.main : 'text.secondary',
        cursor: repo.isPrivate ? 'default' : 'pointer',
      },
      description: {
        maxWidth: '50%',
        color: 'text.secondary',
        fontWeight: 300,
        fontSize: '1rem',
      },
      info: {
        marginY: '6mm',
      },
      metadata: {
        marginLeft: 'auto',
        textAlign: 'right',
      },
      timestamp: {
        color: 'text.secondary',
        fontWeight: 300,
        fontSize: '0.9rem',
        marginY: '2px',
      },
    };
  }
}
