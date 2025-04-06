import { Box, Stack, Typography, alpha, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import type { CompleteTrophy } from '../../../service/types';
import { getDateString, trophyColors } from '../../../util';
import { TrophyProgressBar } from './trophy-progress-bar';

export function CompleteTrophyCard(props: {
  trophy: CompleteTrophy;
  onClick: () => void;
}) {
  const [isHolding, setIsHolding] = useState(false);
  const [overrideHidden, setOverrideHidden] = useState(false);

  useEffect(() => {
    if (!isHolding) {
      setOverrideHidden(false);
      return;
    }
    const timeout = setTimeout(() => {
      if (isHolding) {
        setOverrideHidden(true);
      }
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

  function startHold(e: any) {
    setIsHolding(true);
    absorbEvent(e);
  }

  function endHold(e: any) {
    if (!overrideHidden && isHolding) {
      props.onClick();
    }
    setIsHolding(false);
    absorbEvent(e);
  }

  // to prevent scrolling on phone to interfere with regular "taps"/"holding"
  function handleScroll() {
    setIsHolding(false);
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
        onTouchMove={handleScroll}
        onContextMenu={absorbEvent}
      >
        <Stack direction='row' spacing={{ xs: '4px', sm: '8px' }}>
          <Box
            sx={sx.gameImage}
            component='img'
            src={props.trophy.group.icon}
            onTouchStart={absorbEvent}
            onTouchStartCapture={absorbEvent}
            onTouchMove={absorbEvent}
          />
          <Box
            sx={sx.trophyImage}
            component='img'
            src={props.trophy.icon}
            onTouchStart={absorbEvent}
            onTouchStartCapture={absorbEvent}
            onTouchMove={absorbEvent}
          />
        </Stack>
        <Stack direction='row' sx={sx.dataContainer}>
          <Stack sx={sx.info}>
            <Typography sx={sx.gameName}>{props.trophy.game.name}</Typography>
            <Typography sx={sx.title}>
              {hideDetails ? 'Hidden' : props.trophy.title}
            </Typography>
            <Typography sx={sx.description}>
              {hideDetails
                ? 'Description is hidden.'
                : props.trophy.description}
            </Typography>
          </Stack>
          <Stack sx={sx.details}>
            <Stack direction='row'>
              <Typography sx={sx.rarity}>{props.trophy.rarity}%</Typography>
              <Box sx={sx.trophyIcon} component='img' src={trophyIcon} />
            </Stack>
            {props.trophy.isEarned ? (
              <Typography sx={sx.earnedTime}>
                {getDateString(props.trophy.earnedAt)}
              </Typography>
            ) : props.trophy.progress && !hideDetails ? (
              <Box sx={sx.progressContainer}>
                <TrophyProgressBar progress={props.trophy.progress} />
              </Box>
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
  function getSx() {
    const theme = useTheme();
    const iconShadow = {
      xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
      sm: 'drop-shadow(0 3px 6px rgba(0,0,0,50%))',
    };
    const trophyShadow = {
      xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
      sm: 'drop-shadow(0 2px 3px rgba(0,0,0,50%))',
    };
    return {
      wrapper: {
        cursor: 'pointer',
        overflow: 'hidden',
        width: '100%',
        background: `linear-gradient(7deg,
          ${theme.palette.background.paper} 30%,
          ${alpha(theme.palette.background.paper, 0.3)} 100%
        )`,
        borderRadius: { xs: '6px', sm: '12px' },
        boxSizing: 'border-box',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
        userSelect: 'none',
        webkitUserSelect: 'none',
        touchCallout: 'none',
        webkitTouchCallout: 'none',
      },
      container: {
        padding: { xs: '4px', sm: '8px' },
        background: !props.trophy.isEarned
          ? 'transparent'
          : `radial-gradient(ellipse at 0% 0%, 
                transparent 60%, 
                ${alpha(trophyColors[props.trophy.type], 0.15)} 90%, 
                ${alpha(trophyColors[props.trophy.type], 0.3)} 100%
            )`,
      },
      dataContainer: {
        overflow: 'hidden',
        position: 'relative',
        padding: { xs: '2px 4px 2px 10px', sm: '2px 6px 2px 12px' },
        flexGrow: 1,
      },
      gameImage: {
        width: { xs: '18mm', sm: '28mm' },
        aspectRatio: 1,
        alignSelf: 'center',
        objectFit: 'contain',
        borderRadius: { xs: '4px', sm: '6px' },
        userSelect: 'none',
        webkitUserSelect: 'none',
        touchCallout: 'none',
        webkitTouchCallout: 'none',
      },
      trophyImage: [
        {
          width: { xs: '18mm', sm: '28mm' },
          aspectRatio: 1,
          alignSelf: 'center',
          objectFit: 'contain',
          borderRadius: { xs: '4px', sm: '6px' },
          filter: 'grayscale(100%) blur(4px)',
          WebkitFilter: 'grayscale(100%) blur(4px)',
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
        flexGrow: 1,
        overflow: 'hidden',
        alignItems: 'left',
        justifyContent: 'start',
      },
      gameName: {
        fontSize: { xs: '0.6rem', sm: '0.9rem' },
        fontWeight: 400,
        color: 'text.secondary',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      title: {
        fontSize: { xs: '0.8rem', sm: '1.2rem' },
        color: 'text.primary',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: '-2px',
        marginBottom: '4px',
      },
      description: {
        fontSize: { xs: '0.6rem', sm: '0.9rem' },
        lineHeight: { xs: '0.8rem', sm: '1.1rem' },
        maxHeight: { xs: '1.6rem', sm: '2.2rem' },
        fontWeight: 400,
        overflow: 'hidden',
        color: 'text.secondary',
      },
      details: {
        justifyContent: 'space-between',
        alignItems: 'end',
      },
      trophyIcon: [
        {
          height: { xs: '1rem', sm: '2rem' },
          width: { xs: '1rem', sm: '2rem' },
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
        fontSize: { xs: '0.7rem', sm: '1.1rem' },
        alignSelf: 'center',
        color: 'text.secondary',
        fontWeight: 100,
      },
      earnedTime: {
        fontSize: { xs: '0.7rem', sm: '1.1rem' },
        whiteSpace: 'nowrap',
        color: 'text.secondary',
        fontWeight: 100,
      },
      progressContainer: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 'calc(100% - 12px)',
      },
    };
  }
}
