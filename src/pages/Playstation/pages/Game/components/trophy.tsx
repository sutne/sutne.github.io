import { Box, Stack, Typography, alpha, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import type { Trophy } from '../../../service/types';
import { getDateString, trophyColors } from '../../../util';
import { TrophyProgressBar } from './trophy-progress-bar';

export function TrophyCard(props: { trophy: Trophy }) {
  const theme = useTheme();
  const [isHolding, setIsHolding] = useState(false);
  const [overrideHidden, setOverrideHidden] = useState(false);

  useEffect(() => {
    if (!isHolding) {
      setOverrideHidden(false);
      return;
    }
    const timeout = setTimeout(() => {
      if (!isHolding) return;
      setOverrideHidden(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isHolding]);

  const hideDetails =
    props.trophy.isHidden && !props.trophy.isEarned && !overrideHidden;
  const trophyType = hideDetails ? 'hidden' : props.trophy.type;
  const trophyIcon = new URL(
    `../../../assets/trophies/${trophyType}.png`,
    import.meta.url,
  ).href;

  const iconShadow = {
    xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
    sm: 'drop-shadow(0 3px 6px rgba(0,0,0,50%))',
  };
  const trophyShadow = {
    xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
    sm: 'drop-shadow(0 2px 3px rgba(0,0,0,50%))',
  };

  function startHold(e: any) {
    setIsHolding(true);
    absorbEvent(e);
  }

  function endHold(e: any) {
    setIsHolding(false);
    absorbEvent(e);
  }

  function absorbEvent(e: any) {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
  }

  const sx = getSx();
  return (
    <Box sx={sx.wrapper}>
      <Stack
        sx={sx.container}
        direction='row'
        onMouseDown={startHold}
        onMouseUp={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        onContextMenu={absorbEvent}
      >
        <Box
          sx={sx.icon}
          component='img'
          src={props.trophy.icon}
          onTouchStart={absorbEvent}
          onTouchStartCapture={absorbEvent}
          onTouchMove={absorbEvent}
        />
        <Stack sx={sx.info}>
          <Typography sx={sx.title}>
            {hideDetails ? 'Hidden' : props.trophy.title}
          </Typography>
          <Typography sx={sx.description}>
            {hideDetails ? 'Description is hidden.' : props.trophy.description}
          </Typography>
          <Stack direction='row' sx={sx.stats}>
            <Box sx={sx.trophyIcon} component='img' src={trophyIcon} />
            <Typography sx={sx.rarity}>{props.trophy.rarity}%</Typography>
            {props.trophy.isEarned && (
              <Typography sx={sx.earnedTime}>
                {getDateString(props.trophy.earnedAt)}
              </Typography>
            )}
            {props.trophy.progress && !hideDetails && (
              <TrophyProgressBar progress={props.trophy.progress} />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
  function getSx() {
    return {
      wrapper: {
        overflow: 'hidden',
        width: '100%',
        background: !props.trophy.isEarned
          ? 'transparent'
          : `linear-gradient(13deg,
                transparent 75%,
                ${alpha(trophyColors[props.trophy.type], 0.2)} 90%,
                ${alpha(trophyColors[props.trophy.type], 0.5)} 100%
            )`,
        borderRadius: { xs: '8px', sm: '16px' },
        boxSizing: 'border-box',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
        userSelect: 'none',
        webkitUserSelect: 'none',
        touchCallout: 'none',
        webkitTouchCallout: 'none',
      },
      container: {
        padding: { xs: '8px', sm: '16px' },
        background: `linear-gradient(7deg,
          ${theme.palette.background.paper} 30%,
          ${alpha(theme.palette.background.paper, 0.3)} 100%
        )`,
      },
      icon: [
        {
          minWidth: { xs: '22mm', sm: '32mm' },
          maxWidth: { xs: '22mm', sm: '32mm' },
          aspectRatio: 1,
          alignSelf: 'center',
          objectFit: 'contain',
          borderRadius: { xs: '4px', sm: '6px' },
          filter: `grayscale(100%) ${hideDetails ? 'blur(4px)' : ''}`,
          WebkitFilter: `grayscale(100%) ${hideDetails ? 'blur(4px)' : ''}`,
          opacity: 0.075,
          userSelect: 'none',
          webkitUserSelect: 'none',
          touchCallout: 'none',
          webkitTouchCallout: 'none',
        },
        props.trophy.isEarned && {
          filter: iconShadow,
          WebkitFilter: iconShadow,
          opacity: 1,
        },
      ],
      info: {
        marginLeft: { xs: '8px', sm: '16px' },
        width: '100%',
        overflow: 'hidden',
      },
      title: {
        fontSize: { xs: '0.9rem', sm: '1.2rem' },
        color: 'text.primary',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      description: {
        fontSize: { xs: '0.7rem', sm: '1rem' },
        height: { xs: '2.2rem', sm: '3.4rem' },
        lineHeight: { xs: '1.1rem', sm: '1.7rem' },
        overflow: 'hidden',
        color: 'text.secondary',
      },
      stats: {
        // width: '100%',
      },
      trophyIcon: [
        {
          height: { xs: '1.5rem', sm: '2.5rem' },
          width: { xs: '1.5rem', sm: '2.5rem' },
          objectFit: 'contain',
          WebkitFilter: trophyShadow,
          filter: trophyShadow,
          opacity: 1,
        },
        !props.trophy.isEarned && {
          opacity: 0.2,
        },
      ],
      rarity: {
        fontSize: { xs: '0.7rem', sm: '1.2rem' },
        alignSelf: 'center',
        flexGrow: 1,
        color: 'text.secondary',
        fontWeight: 100,
      },
      earnedTime: {
        fontSize: { xs: '0.7rem', sm: '1rem' },
        alignSelf: 'flex-end',
        color: 'text.secondary',
        fontWeight: 100,
      },
    };
  }
}
