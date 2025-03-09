import {
  Box,
  Button,
  Stack,
  Typography,
  alpha,
  capitalize,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as API from '../../service/api';
import type { Platform, Trophy, TrophyGroup } from '../../service/types';
import { getDateString, trophyColors } from '../../util';
import { TrophyProgressBar } from '../Game/components/trophy-progress-bar';
import { RarityPyramid } from './components/rarity-pyramid';
import { getRarityDescription } from './util';

export function SingleTrophy() {
  const params = useParams();

  const [trophy, setTrophy] = useState<Trophy | undefined>(undefined);
  const [group, setGroup] = useState<TrophyGroup | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [overrideHidden, setOverrideHidden] = useState(false);

  const hideDetails = trophy?.isHidden && !trophy?.isEarned && !overrideHidden;
  const trophyType = hideDetails ? 'hidden' : trophy?.type;
  const trophyIcon = new URL(
    `../../assets/trophies/${trophyType}.png`,
    import.meta.url,
  ).href;

  useEffect(() => {
    const getData = async () => {
      if (!params.gameIds || !params.platforms || !params.trophyId) return;
      setIsLoading(true);
      const response = await API.getTrophyGroups(
        params.gameIds.split(','),
        params.platforms.split(',') as Platform[],
      );
      const allTrophies = response?.reduce(
        (trophies, group) => trophies.concat(group.trophies),
        [] as Trophy[],
      );
      setTrophy(allTrophies?.find((t) => t.id === Number(params.trophyId)));
      setGroup(
        response.find((group) =>
          group.trophies.find((t) => t.id === Number(params.trophyId)),
        ),
      );
      setIsLoading(false);
    };
    getData();
  }, [params.gameIds, params.platforms]);

  function absorbEvent(e: any) {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
  }

  const sx = getSx();
  if (isLoading) return <>loading...</>;
  if (!trophy) return <>no trophy :(</>;
  if (!group) return <>no group :(</>;
  return (
    <Stack sx={sx.wrapper} direction='column' spacing={1}>
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
        <Stack width='50%' alignItems='center'>
          <Box sx={sx.trophyIcon} component='img' src={trophyIcon} />
          <Typography sx={sx.text}>{capitalize(trophyType ?? '')}</Typography>
          <Typography sx={sx.label}>Grade</Typography>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems='end'
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

  function getSx() {
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
        margin: '0px -24px -24px -24px',
        padding: {
          xs: '0 32px 28px 32px',
          md: '0 32px 28px 32px',
        },
        background: !trophy?.isEarned
          ? 'transparent'
          : `linear-gradient(160deg,
                transparent 75%,
                ${alpha(trophyColors[trophy?.type], 0.2)} 90%,
                ${alpha(trophyColors[trophy?.type], 0.5)} 100%
            )`,
      },
      icon: [
        {
          maxWidth: { xs: '70mm', sm: '110mm', md: '200mm' },
          aspectRatio: 1,
          alignSelf: 'center',
          objectFit: 'contain',
          borderRadius: { xs: '4px', md: '6px' },
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
      ],
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
          height: { xs: '26mm', md: '42mm' },
          aspectRatio: 1,
          objectFit: 'contain',
          WebkitFilter: trophyShadow,
          filter: trophyShadow,
          opacity: 1,
        },
        !trophy?.isEarned && {
          opacity: trophyType === 'hidden' ? 0.5 : 0.2,
        },
      ],
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
}
