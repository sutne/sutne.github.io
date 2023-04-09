import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { useApp } from 'providers/app-provider';

type props = {
  onTap?: () => void;
};
export function AppIcon({ ...props }: props) {
  const { name, open, iconReference, isOpen } = useApp();

  // want to target the center of the app icon
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!iconReference?.current) return;
    setOrigin({
      x: iconReference.current.x,
      y: iconReference.current.y,
    });
  }, [iconReference]);

  // apps are center, so target is center of screen
  const target = {
    x: window.innerWidth / 2 - 40,
    y: 40, // app content is always at top of page
  };
  // translation from origin to target
  const transform = {
    x: target.x - origin.x,
    y: target.y - origin.y,
  };

  const animation = '400ms cubic-bezier(.15,.01,.79,.42)';
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
        },
        isOpen && {
          transform: `translate(${transform.x}px,${transform.y}px) scale(0)`,
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
          color: 'text.primary',
          textWrap: 'wrap',
          overflowWrap: 'break-word',
          fontSize: { xs: '0.7em', sm: '0.8em' },
          marginTop: { xs: '0.5mm', sm: '1mm' },
        },
      ],
    };
  }
}
