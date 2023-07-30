import React from 'react';
import { Box, Collapse, Stack, Typography } from '@mui/material';

import { ShimmerImage, ShimmerText } from 'components/animated/shimmer';

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
  expanded?: boolean;
}) {
  const sx = getSx();
  const [expanded, setExpanded] = React.useState(props.expanded ?? false);

  const trophyCount = (type: TrophyType) => {
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

  const title = () => {
    if (props.title === '') {
      return <ShimmerText fontSize={sx.title.fontSize} numLines={1} />;
    }
    return <Typography sx={sx.title}>{props.title}</Typography>;
  };

  const image = () => {
    if (props.image === '') {
      return (
        <ShimmerImage
          width={sx.image.minWidth}
          sx={{
            borderRadius: sx.image.borderRadius,
            boxShadow: sx.image.boxShadow,
          }}
        />
      );
    }
    return <Box sx={sx.image} component='img' src={props.image} />;
  };

  const onClick = () => {
    if (props.title === '') return;
    if (props.expanded) return;
    setExpanded((isExpanded) => !isExpanded);
  };

  return (
    <>
      <Stack sx={sx.container} direction='row' onClick={onClick}>
        {image()}
        {props.platform && (
          <Typography sx={sx.platform}>{props.platform}</Typography>
        )}
        <Stack sx={sx.info}>
          {title()}
          <Stack sx={sx.trophyCount} direction='row' spacing={0}>
            {[
              trophyCount('platinum'),
              trophyCount('gold'),
              trophyCount('silver'),
              trophyCount('bronze'),
            ]}
          </Stack>
          {props.title !== '' && (
            <Box sx={sx.progress}>
              <ProgressBar progress={props.progress} />
            </Box>
          )}
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
    return {
      container: {
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: { xs: '8px', sm: '16px' },
        cursor: props.expanded || props.title === '' ? 'default' : 'pointer',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      image: {
        position: 'relative',
        minWidth: { xs: '26mm', sm: '40mm', md: '225px' },
        maxWidth: { xs: '26mm', sm: '40mm', md: '225px' },
        aspectRatio: 1,
        objectFit: 'contain',
        borderRadius: { xs: '8px', sm: '16px' },
        alignSelf: 'center',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      info: {
        position: 'relative',
        margin: '16px',
        width: '100%',
        overflow: 'hidden',
      },
      title: {
        fontSize: { xs: '0.7rem', sm: '1.1rem', md: '1.5rem' },
        height: '100%',
        color: 'text.primary',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      trophyCount: {
        alignSelf: 'flex-end',
        maxWidth: '50%',
        height: '100%',
        marginBottom: '8px',
      },
      platform: {
        position: 'absolute',
        top: { xs: '4px', sm: '8px' },
        left: { xs: '4px', sm: '8px' },
        bgcolor: props.platform === 'PS5' ? 'white' : 'black',
        color: props.platform === 'PS5' ? 'black' : 'white',
        borderRadius: '8px',
        padding: { xs: '1px 5px', sm: '0 8px' },
        fontSize: { xs: '0.4rem', sm: '0.8rem' },
        fontWeight: 400,
        boxShadow:
          props.platform === 'PS5'
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
