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
import { useSessionState } from '../../../hooks/useStorageState';
import type { PlatformInfo, TrophyCount, TrophyType } from '../service/types';
import { unearnedTrophyGroupTitle } from '../util/grouping';
import { PlatformChip } from './PlatformChip';
import { ProgressBar, ProgressBarShimmer } from './ProgressBar';
import { TrophyWithCount, TrophyWithCountShimmer } from './TrophyWithCount';

function useExpansionState(
  key: string,
  preserveState: boolean,
  alwaysExpanded: boolean,
) {
  if (alwaysExpanded) {
    return [true, () => {}] as const;
  }
  if (preserveState) {
    const formattedKey = key
      .toLowerCase()
      .replace(/[^\w]+/g, '-')
      .replace(/^-|-$/g, '');
    return useSessionState(`expand-${formattedKey}`, false);
  }
  return useState(false);
}

export function TrophyProgressCard(props: {
  image: string;
  title: string;
  progress: number;
  trophyCount: TrophyCount;
  earnedCount: TrophyCount;
  platform?: PlatformInfo[];
  children?: JSX.Element;
  alwaysExpanded?: boolean;
  preserveState?: boolean;
  onClick?: () => void;
}) {
  const canExpand = Boolean(props.children) && !props.alwaysExpanded;
  const isInteractable = Boolean(props.onClick) || canExpand;
  const [expanded, setExpanded] = useExpansionState(
    props.title,
    Boolean(canExpand && props.preserveState),
    props.alwaysExpanded ?? false,
  );

  const trophyCount = (type: TrophyType) => {
    const count = props.earnedCount[type];
    return (
      <TrophyWithCount
        key={type}
        type={type}
        count={count}
        hideTextForZero
        hide={props.trophyCount[type] === 0}
      />
    );
  };

  const handleClick = () => {
    if (!isInteractable) return;
    if (props.onClick) {
      props.onClick();
      return;
    }
    setExpanded((isExpanded) => !isExpanded);
  };

  const sx = getSx(isInteractable);
  return (
    <>
      <Stack sx={sx.container} direction='row' onClick={handleClick}>
        <Box sx={sx.image} component='img' src={props.image} />
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
          <Typography sx={sx.title}>{props.title}</Typography>
          <Stack
            sx={{
              ...sx.trophyCount,
              opacity: props.title === unearnedTrophyGroupTitle ? 0.2 : 1,
            }}
            direction='row'
            spacing={0}
          >
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
}

export function TrophyProgressCardShimmer() {
  const sx = getSx(false);
  return (
    <>
      <Stack sx={sx.container} direction='row'>
        <ShimmerImage
          width={sx.image.width}
          sx={{
            borderRadius: sx.image.borderRadius,
            boxShadow: sx.image.boxShadow,
          }}
        />
        <Stack sx={sx.info}>
          <ShimmerText width='40%' fontSize={sx.title.fontSize} />
          <Stack sx={sx.trophyCount} direction='row' spacing={0}>
            <TrophyWithCountShimmer type='platinum' />
            <TrophyWithCountShimmer type='gold' />
            <TrophyWithCountShimmer type='silver' />
            <TrophyWithCountShimmer type='bronze' />
          </Stack>
          <Box sx={sx.progress}>
            <ProgressBarShimmer />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

function getSx(isInteractable: boolean) {
  const theme = useTheme();
  return {
    container: {
      position: 'relative',
      overflow: 'hidden',
      background: `linear-gradient(10deg,
        ${theme.palette.background.paper} 30%,
        ${alpha(theme.palette.background.paper, 0.4)} 100%
      )`,
      borderRadius: { xs: '8px', sm: '16px' },
      cursor: isInteractable ? 'pointer' : 'default',
      boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    },
    image: {
      position: 'relative',
      width: { xs: '32mm', sm: '40mm', md: '52mm' },
      height: { xs: '32mm', sm: '40mm', md: '52mm' },
      objectFit: 'contain',
      borderRadius: { xs: '8px', sm: '16px' },
      alignSelf: 'center',
      boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    },
    platforms: {
      position: 'absolute',
      bottom: { xs: '5px', sm: '8px' },
      left: { xs: '5px', sm: '8px' },
      fontSize: { xs: '0.5rem', sm: '0.8rem' },
    },
    info: {
      position: 'relative',
      margin: { xs: '8px', md: '16px' },
      width: '100%',
      overflow: 'hidden',
    },
    title: {
      fontSize: { xs: '0.7rem', sm: '1.1rem', md: '1.5rem' },
      color: 'text.primary',
      width: '100%',
      overflow: 'hidden',
      paddingBottom: '1em', // hack to show y-overflow (to not clip "g", "p" etc.)
      marginBottom: '-1em', // while hiding x-overflow (to get ellipsis)
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    trophyCount: {
      alignSelf: 'flex-end',
      maxWidth: '75%',
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
