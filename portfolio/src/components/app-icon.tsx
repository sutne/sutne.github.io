import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { useApp } from 'providers/app-provider';
import { useMainTheme } from 'providers/main-theme-provider';

type props = {
  onTap?: () => void;
};
export function AppIcon({ ...props }: props) {
  const { name, open, iconReference, isOpen } = useApp();
  const { theme } = useMainTheme();

  // want to target the center of the app icon
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!iconReference?.current) return;
    setOrigin({
      x: iconReference.current.x,
      y: iconReference.current.y,
    });
    // apps are center, so target is center of screen
    setTarget({
      x: document.body.clientWidth / 2 - iconReference.current.clientWidth / 2,
      y: iconReference.current.clientHeight / 2,
    });
  }, [iconReference]);

  useEffect(() => {
    if (!iconReference?.current) return;
    // apps are center, so target is center of screen
    setTarget({
      x: document.body.clientWidth / 2 - iconReference.current.clientWidth / 2,
      y: iconReference.current.clientHeight / 2,
    });
  }, [document.body.clientWidth, document.body.clientHeight]);

  // translation from origin to target
  const transform = {
    x: target.x - origin.x,
    y: target.y - origin.y,
  };

  const animation = '300ms ease-in';
  const sx = getSx();
  return (
    <>
      <Box sx={sx.hover}>
        <Box
          sx={sx.container}
          onClick={() => (props.onTap ? props.onTap() : open())}
        >
          <Box
            ref={iconReference}
            sx={sx.icon}
            component='img'
            src={require(`assets/apps/${name}.png`)}
          />
          <Box sx={sx.name}>{name}</Box>
        </Box>
      </Box>
    </>
  );
  function getSx() {
    return {
      hover: {
        transition: 'transform ease-in 0.1s',
        '&:hover': {
          transform: 'scale(1.06)',
        },
      },
      container: [
        {
          width: { xs: '18mm', sm: '22mm' },
          height: 'fit-content',
          textAlign: 'center',
          cursor: 'pointer',
          transition: `transform ${animation}, opacity ${animation}`,
          transform: 'none',
          opacity: 1,
        },
        isOpen && {
          transform: {
            xs: 'none',
            sm: `translate(${transform.x}px,${transform.y}px)`,
          },
          opacity: 0,
        },
      ],
      icon: [
        {
          width: { xs: '16mm', sm: '18mm' },
          aspectRatio: '1',
          borderRadius: '25%',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 30%)',
        },
      ],
      name: [
        {
          color: theme.palette.text.primary,
          textWrap: 'wrap',
          overflowWrap: 'break-word',
          fontSize: { xs: '0.7em', sm: '0.8em' },
          marginTop: { xs: '0.5mm', sm: '1mm' },
        },
      ],
    };
  }
}
