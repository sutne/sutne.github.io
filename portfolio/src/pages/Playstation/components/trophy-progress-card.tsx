import React from 'react';
import { Box, Collapse, Stack, Typography } from '@mui/material';

import { TrophyCount, TrophyType } from '../service/types';
import { ProgressBar } from './progress-bar';
import { TrophyWithCount } from './trophy-with-count';

export function TrophyProgressCard(props: {
  image: string;
  title: string;
  progress: number;
  trophyCount: TrophyCount;
  earnedCount: TrophyCount;
  platform?: string;
  children?: JSX.Element;
}) {
  const [expanded, setExpanded] = React.useState(false);

  const TrophyCount = ({ type }: { type: TrophyType }) => {
    const count = props.earnedCount[type];
    return (
      <TrophyWithCount
        type={type}
        count={count}
        hideZero
        hide={props.trophyCount[type] === 0}
      />
    );
  };

  const sx = getSx();
  return (
    <>
      <Stack
        sx={sx.container}
        direction='row'
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Box sx={sx.image} component='img' src={props.image} />
        {props.platform && (
          <Typography sx={sx.platform}>{props.platform}</Typography>
        )}
        <Stack sx={sx.info}>
          <Typography sx={sx.title}>{props.title}</Typography>
          <Stack sx={sx.trophyCount} direction='row' spacing={0}>
            <TrophyCount type='platinum' />
            <TrophyCount type='gold' />
            <TrophyCount type='silver' />
            <TrophyCount type='bronze' />
          </Stack>
          <Box sx={sx.progress}>
            <ProgressBar progress={props.progress} />
          </Box>
        </Stack>
      </Stack>
      {props.children && (
        <Collapse in={expanded} timeout={300} unmountOnExit>
          {props.children}
        </Collapse>
      )}
    </>
  );
  function getSx() {
    const height = { xs: '20mm', sm: '40mm', md: '60mm' };
    return {
      container: {
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: '16px',
        cursor: props.children ? 'pointer' : 'default',
      },
      image: {
        position: 'relative',
        height: height,
        width: height,
        objectFit: 'contain',
        borderRadius: '16px',
      },
      info: {
        position: 'relative',
        margin: '16px',
        width: '100%',
        overflow: 'hidden',
      },
      title: {
        fontSize: { xs: '1rem', sm: '1.5rem' },
        color: 'text.primary',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        height: { xs: '2.2rem', sm: '3.4rem' },
        lineHeight: { xs: '1.1rem', sm: '1.7rem' },
      },
      trophyCount: {
        alignSelf: 'flex-end',
        width: '50%',
      },
      platform: {
        position: 'absolute',
        top: '8px',
        left: '8px',
        bgcolor: props.platform == 'PS5' ? 'white' : 'black',
        color: props.platform == 'PS5' ? 'black' : 'white',
        borderRadius: '8px',
        padding: '0 8px',
        fontSize: '0.8rem',
        fontWeight: 400,
        boxShadow:
          props.platform == 'PS5'
            ? '0 1px 6px 2px rgba(0,0,0,0.3)'
            : '0 1px 6px 2px rgba(255,255,255,0.15)',
      },
      progress: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
      },
      trophyListContainer: {
        width: '100%',
        padding: '16px',
      },
    };
  }
}
