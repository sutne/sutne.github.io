import {
  Box,
  Collapse,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { ShimmerImage, ShimmerText } from 'components/animated/shimmer';
import { type JSX, useState } from 'react';
import type { PlatformInfo, TrophyCount, TrophyType } from '../service/types';
import { PlatformChip } from './platform-chip';
import { ProgressBar } from './progress-bar';
import { TrophyWithCount } from './trophy-with-count';

export function TrophyProgressCard(props: {
  image: string;
  title: string;
  progress: number;
  trophyCount: TrophyCount;
  earnedCount: TrophyCount;
  platform?: PlatformInfo[];
  children?: JSX.Element;
  expanded?: boolean;
}) {
  const theme = useTheme();
  const sx = getSx();
  const [expanded, setExpanded] = useState(props.expanded ?? false);

  const trophyCount = (type: TrophyType) => {
    const count = props.earnedCount[type];
    return (
      <TrophyWithCount
        key={type}
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
          <Stack
            sx={sx.platforms}
            direction='row'
            gap={{ xs: '4px', m: '6px' }}
          >
            {props.platform.map((info) => (
              <PlatformChip key={info.id} platform={info.platform} />
            ))}
          </Stack>
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
          {props.title !== '' && props.progress !== -1 && (
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
        background: `linear-gradient(10deg,
          ${theme.palette.background.paper} 30%,
          ${alpha(theme.palette.background.paper, 0.4)} 100%
        )`,
        borderRadius: { xs: '8px', sm: '16px' },
        cursor:
          props.expanded || props.title === '' || !props.children
            ? 'default'
            : 'pointer',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      image: {
        position: 'relative',
        minWidth: { xs: '32mm', sm: '40mm', md: '52mm' },
        maxWidth: { xs: '32mm', sm: '40mm', md: '52mm' },
        aspectRatio: 1,
        objectFit: 'contain',
        borderRadius: { xs: '8px', sm: '16px' },
        alignSelf: 'center',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      platforms: {
        position: 'absolute',
        top: { xs: '4px', sm: '8px' },
        left: { xs: '4px', sm: '8px' },
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
