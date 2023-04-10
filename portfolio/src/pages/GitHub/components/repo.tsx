import React from 'react';
import { LinkRounded } from '@mui/icons-material';
import { alpha, Box, Collapse, Stack, Typography } from '@mui/material';

import { useApp } from 'providers/app-provider';

import { LanguageColorMap, RepoType } from '../service/types';
import { toTimeDiffString } from '../util';
import { RepoCard } from './card';
import { LanguageBar } from './language-bar';

type props = {
  repo: RepoType;
};
export function Repository({ repo }: props) {
  const [expanded, setExpanded] = React.useState(false);

  const { theme } = useApp();

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
              {repo.isPrivate ? <></> : <LinkRounded sx={sx.link_icon} />}
              {repo.isPrivate ? 'Private' : 'Public'}
            </Box>
          </Box>
          <Collapse in={expanded} timeout={200}>
            <Stack sx={sx.info} direction={{ xs: 'column', sm: 'row' }}>
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
      owner: {
        height: '36px',
        width: '36px',
        marginRight: '16px',
        borderRadius: '50%',
      },
      name: [
        {
          color: 'text.primary',
          flex: 1,
          fontWeight: 500,
          fontSize: { xs: '1rem', sm: '1.3rem' },
          alignSelf: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: '100%',
        },
      ],
      dominantLanguage: {
        visibility: { xs: 'hidden', sm: 'visible' },
        position: { xs: 'fixed', sm: 'relative' },
        marginLeft: '12px',
        transition: 'opacity 0.2s ease-in-out',
        opacity: expanded ? '0' : '1',
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
        width: { xs: '55px', sm: '80px' },
        padding: '4px 8px',
        marginLeft: '12px',
        fontSize: { xs: '0.7rem', sm: '0.9rem' },
        fontWeight: 500,
        bgcolor: 'background.default',
        border: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
        borderRadius: '2rem',
        color: repo.isPrivate ? theme.palette.error.main : 'text.secondary',
        cursor: repo.isPrivate ? 'default' : 'pointer',
      },
      link_icon: {
        marginRight: '5px',
        fontSize: { xs: '0.9rem', sm: '1.5rem' },
      },
      description: {
        maxWidth: { xs: '100%', sm: '50%' },
        color: 'text.secondary',
        fontWeight: 300,
        fontSize: '1rem',
      },
      info: {
        marginTop: '6mm',
      },
      metadata: {
        marginTop: { xs: '12px', sm: '0px' },
        marginLeft: { xs: 'none', sm: 'auto' },
        textAlign: { xs: 'left', sm: 'right' },
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
