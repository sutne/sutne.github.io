import React from 'react';
import { LinkRounded } from '@mui/icons-material';
import {
  alpha,
  Box,
  Collapse,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

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
  const isPhone = useMediaQuery(theme.breakpoints.only('xs'));
  return (
    <Box sx={sx.wrapper} onClick={() => setExpanded((prev) => !prev)}>
      <RepoCard>
        <>
          <Box sx={sx.titleRow}>
            <Box sx={sx.owner} component='img' src={repo.owner.image} />
            <Box sx={sx.nameBox}>
              <Typography sx={sx.name}>{repo.name}</Typography>
              {repo.isArchived && (
                <Typography sx={sx.archived}>
                  {isPhone ? 'A' : 'Archived'}
                </Typography>
              )}
            </Box>
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
            <Grid sx={sx.topics} container spacing={1}>
              {repo.topics.map((topic, i) => (
                <Grid item key={i}>
                  <Typography sx={sx.topic}>{topic}</Typography>
                </Grid>
              ))}
            </Grid>
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
      nameBox: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        overflow: 'hidden',
      },
      name: [
        {
          color: 'text.primary',
          display: 'block',
          fontWeight: 500,
          fontSize: { xs: '1rem', sm: '1.3rem' },
          alignSelf: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
      ],
      archived: {
        color: 'warning.main',
        fontWeight: 400,
        fontSize: { xs: '0.6rem', sm: '0.9rem' },
        width: 'fit-content',
        padding: { xs: '2px 6px', sm: '2px 12px' },
        marginLeft: '12px',
        borderRadius: '2rem',
        border: `1px solid ${theme.palette.warning.main}`,
      },
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
      topics: {
        marginY: repo.topics ? '6px' : '0px',
      },
      topic: {
        padding: '4px 12px',
        fontSize: '0.8rem',
        fontWeight: 600,
        border: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
        borderRadius: '2rem',
        color: 'text.secondary',
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
        fontSize: '0.8rem',
        marginY: '2px',
      },
    };
  }
}
