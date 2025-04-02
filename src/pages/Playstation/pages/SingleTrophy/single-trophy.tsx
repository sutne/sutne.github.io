import {
  Box,
  Button,
  Stack,
  Typography,
  alpha,
  capitalize,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ShimmerImage,
  ShimmerText,
} from '../../../../components/animated/shimmer';
import { Shine3D } from '../../../../components/shine-3d';
import { useSingleGameTrophies } from '../../providers/game-trophy-provider';
import type { Trophy, TrophyType } from '../../service/types';
import { getDateString, trophyColors } from '../../util';
import { getRarityDescription } from '../../util';
import { TrophyProgressBar } from '../Game/components/trophy-progress-bar';
import { RarityPyramid } from './components/rarity-pyramid';

export function SingleTrophy() {
  const params = useParams();
  const { isLoading, getTrophyDetails } = useSingleGameTrophies();
  const details = getTrophyDetails(Number(params.trophyId));
  const [overrideHidden, setOverrideHidden] = useState(false);

  const trophy = details?.trophy;
  const group = details?.group;

  const hideDetails = Boolean(
    trophy?.isHidden && !trophy?.isEarned && !overrideHidden,
  );
  const trophyType = hideDetails ? 'hidden' : trophy?.type;
  const trophyIcon = new URL(
    `../../assets/trophies/${trophyType}.png`,
    import.meta.url,
  ).href;

  function absorbEvent(e: any) {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
  }

  const sx = getSx(trophy, hideDetails, trophyType);
  if (isLoading) return <SingleTrophyShimmer />;
  if (!trophy) return <>Something went wrong loading this trophy</>;
  if (!group) return <>Something went wrong loading this trophy</>;
  return (
    <Stack sx={sx.wrapper} direction='column' spacing={1}>
      <Shine3D disable={!trophy.isEarned} sx={sx.iconContainer}>
        <Box
          sx={sx.icon}
          component='img'
          src={trophy.icon}
          onMouseDown={absorbEvent}
          onTouchStart={absorbEvent}
          onTouchStartCapture={absorbEvent}
          onTouchMove={absorbEvent}
          onContextMenu={absorbEvent}
        />
      </Shine3D>

      <Stack
        direction='row'
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        <Box sx={sx.groupIcon} component='img' src={group?.icon} />
        <Stack sx={{ flexGrow: 1 }}>
          <Typography sx={sx.groupTitle}>{group.name}</Typography>
          <Typography sx={sx.title}>
            {hideDetails ? 'Hidden' : trophy.title}
          </Typography>
        </Stack>
        {trophy?.isHidden && !trophy?.isEarned && !overrideHidden && (
          <Button sx={sx.button} onClick={() => setOverrideHidden(true)}>
            Show Spoilers
          </Button>
        )}
      </Stack>

      <Stack direction='row' spacing={2} alignItems='end'>
        <Stack width='50%' alignItems='center'>
          <Box sx={sx.trophyIcon} component='img' src={trophyIcon} />
          <Typography sx={sx.text}>{capitalize(trophyType ?? '')}</Typography>
          <Typography sx={sx.label}>Grade</Typography>
        </Stack>
        <Stack width='50%' alignItems='center'>
          {trophy.rarity && (
            <>
              <RarityPyramid
                rarity={trophy.rarity}
                pixelWidth={{ xs: 76, md: 112 }}
              />
              <Typography sx={sx.text} whiteSpace='pre'>
                {`${getRarityDescription(trophy.rarity)}  ${trophy.rarity}%`}
              </Typography>
              <Typography sx={sx.label}>Rarity</Typography>
            </>
          )}
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems='end'
        paddingTop='12px'
      >
        <Stack width={{ xs: '100%', sm: '50%' }} alignItems='start'>
          <Typography sx={sx.label}>Description</Typography>
          <Typography sx={sx.text}>
            {hideDetails ? 'Description is hidden.' : trophy.description}
          </Typography>
        </Stack>
        <Stack width={{ xs: '100%', sm: '50%' }} alignItems='end'>
          {trophy.isEarned ? (
            <>
              <Typography sx={sx.label}>Earned</Typography>
              <Typography sx={sx.text}>
                {getDateString(trophy.earnedAt)}
              </Typography>
            </>
          ) : trophy.progress && !hideDetails ? (
            <>
              <Typography sx={sx.label}>Progress</Typography>
              <TrophyProgressBar progress={trophy.progress} />
            </>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export function SingleTrophyShimmer() {
  const sx = getSx(undefined, false, undefined);
  return (
    <Stack sx={sx.wrapper} direction='column' spacing={1}>
      <Box sx={sx.iconContainer}>
        <ShimmerImage width={sx.iconContainer.maxWidth} />
      </Box>
      <Stack
        direction='row'
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        <ShimmerImage width={sx.groupIcon.width} />
        <Stack sx={{ flexGrow: 1 }}>
          <ShimmerText width='30%' fontSize={sx.groupTitle.fontSize} />
          <ShimmerText numLines={1} fontSize={sx.title.fontSize} />
        </Stack>
      </Stack>

      <Stack direction='row' spacing={2} alignItems='end'>
        <Stack width='50%' alignItems='center'>
          <ShimmerImage width={sx.trophyIcon[0].width} />
          <ShimmerText numLines={1} fontSize={sx.text.fontSize} />
          <Typography sx={sx.label}>Grade</Typography>
        </Stack>
        <Stack width='50%' alignItems='center'>
          <ShimmerImage width={sx.trophyIcon[0].width} />
          <ShimmerText numLines={1} fontSize={sx.text.fontSize} />
          <Typography sx={sx.label}>Rarity</Typography>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems='end'
      >
        <Stack width={{ xs: '100%', sm: '50%' }} alignItems='start'>
          <Typography sx={sx.label}>Description</Typography>
          <ShimmerText numLines={2} fontSize={sx.text.fontSize} />
        </Stack>
      </Stack>
    </Stack>
  );
}

function getSx(
  trophy: Trophy | undefined,
  hideDetails: boolean,
  trophyType: TrophyType | 'hidden' | undefined,
) {
  const iconShadow = {
    xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
    md: 'drop-shadow(0 3px 6px rgba(0,0,0,50%))',
  };
  const trophyShadow = {
    xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
    md: 'drop-shadow(0 2px 3px rgba(0,0,0,50%))',
  };
  return {
    wrapper: {
      margin: { xs: '-8px', sm: '-24px' },
      padding: {
        xs: '16px 12px 8px 12px',
        sm: '16px 32px 22px 32px',
      },
      background: !trophy?.isEarned
        ? 'transparent'
        : `radial-gradient(ellipse at 10% 20%, 
              transparent 60%, 
              ${alpha(trophyColors[trophy?.type], 0.2)} 85%, 
              ${alpha(trophyColors[trophy?.type], 0.5)} 100%
          )`,
    },
    iconContainer: {
      maxWidth: { xs: '70mm', sm: '90mm', md: '100mm' },
      aspectRatio: 1,
      borderRadius: '4%',
      alignSelf: 'center',
    },
    icon: [
      {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: 'inherit',
        filter: {
          xs: `grayscale(100%) ${hideDetails ? 'blur(8px)' : ''}`,
          sm: `grayscale(100%) ${hideDetails ? 'blur(12px)' : ''}`,
          md: `grayscale(100%) ${hideDetails ? 'blur(16px)' : ''}`,
        },
        WebkitFilter: {
          xs: `grayscale(100%) ${hideDetails ? 'blur(8px)' : ''}`,
          sm: `grayscale(100%) ${hideDetails ? 'blur(12px)' : ''}`,
          md: `grayscale(100%) ${hideDetails ? 'blur(16px)' : ''}`,
        },
        opacity: 0.075,
      },
      (trophy?.isEarned ?? false) && {
        filter: iconShadow,
        WebkitFilter: iconShadow,
        opacity: 1,
      },
    ] as const,
    groupIcon: {
      borderRadius: '7%',
      height: { xs: '12mm', md: '18mm' },
      width: { xs: '12mm', md: '18mm' },
      objectFit: 'contain',
    },
    groupTitle: {
      fontSize: { xs: '0.6rem', md: '0.9rem' },
      color: 'text.secondary',
    },
    title: {
      fontSize: { xs: '1.2rem', md: '2rem' },
      fontWeight: 700,
      color: 'text.primary',
    },
    button: {
      bgcolor: 'background.paper',
      borderRadius: '32px',
      padding: '6px 16px',
      fontSize: { xs: '0.7rem', md: '0.9rem' },
      color: 'text.primary',
      textTransform: 'none',
    },
    trophyIcon: [
      {
        width: { xs: '26mm', md: '42mm' },
        aspectRatio: 1,
        objectFit: 'contain',
        WebkitFilter: trophyShadow,
        filter: trophyShadow,
        opacity: 1,
      },
      !trophy?.isEarned && {
        opacity: trophyType === 'hidden' ? 0.5 : 0.2,
      },
    ] as const,
    label: {
      fontSize: { xs: '0.6rem', md: '0.8rem' },
      color: 'text.secondary',
    },
    text: {
      fontSize: { xs: '0.8rem', md: '1.2rem' },
      color: 'text.primary',
    },
  };
}
