import React, { useEffect, useState } from 'react';
import { Minimize } from '@mui/icons-material';
import { alpha, Box, IconButton, Stack, Typography } from '@mui/material';

import { useApp } from 'providers/app-provider';
import { useTheme } from 'providers/theme-provider';

type props = {
  children: JSX.Element;
  appBarColor?: string;
};
export function AppContent({ appBarColor, children }: props) {
  const { theme } = useTheme();
  const { name, close } = useApp();

  const titleBackground = appBarColor
    ? appBarColor
    : theme.palette.background.paper;

  const sx = getSx();
  return (
    <AppContentWrapper>
      <Box sx={sx.content}>
        <Stack direction='row' sx={sx.title_bar}>
          <Box
            sx={sx.title_icon}
            component='img'
            src={require(`assets/apps/${name}.png`)}
          />
          <Typography sx={sx.title_name} alignSelf='center'>
            {name}
          </Typography>
          <IconButton sx={sx.title_close_button} onClick={() => close()}>
            <Minimize />
          </IconButton>
        </Stack>
        {children}
      </Box>
    </AppContentWrapper>
  );

  function getSx() {
    return {
      content: {
        width: { xs: '100%', sm: 'fit-content' },
        height: 'fit-content',
        margin: 'auto',
        maxWidth: '100%',
        borderRadius: '16px',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 70%)',
      },
      title_bar: {
        padding: '12px',
        borderRadius: '16px 16px 0 0',
        background: `linear-gradient(0deg, 
          ${alpha(titleBackground, 0.4)} 0%,
          ${alpha(titleBackground, 1)} 100%
        )`,
        boxShadow: '0px 3px 3px rgba(0,0,0,40%)',
      },
      title_icon: {
        width: '3em',
        height: '3em',
        borderRadius: '25%',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 30%)',
      },
      title_name: {
        paddingLeft: '16px',
        paddingRight: '24px',
        fontSize: '1.5em',
        fontWeight: 300,
        lineHeight: '100%',
        width: '100%',
      },
      title_close_button: {
        alignSelf: 'center',
        height: '2em',
        width: '2em',
        color: theme.palette.text.primary,
        '&:hover': {
          bgcolor: 'transparent',
        },
      },
    };
  }
}

type wrapper_props = {
  children: JSX.Element;
};
export function AppContentWrapper({ children }: wrapper_props) {
  const { isOpen, close, iconReference } = useApp();

  // want to target the center of the app icon
  const [target, setTarget] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!iconReference?.current) return;
    setTarget({
      x: iconReference.current.x + iconReference.current.clientWidth / 2,
      y: iconReference.current.y + iconReference.current.clientHeight / 2,
    });
  }, [iconReference]);
  // apps are center, so origin is center of screen
  const origin = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  // translation from origin to target
  const transform = {
    x: target.x - origin.x,
    y: target.y - origin.y,
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.target === e.currentTarget) close();
  };

  const animation = '400ms cubic-bezier(.15,.01,.79,.42)';
  const sx = getSx();
  return (
    <Box sx={sx.background} onClick={(e) => handleClose(e)}>
      <Box sx={sx.reset} onClick={(e) => handleClose(e)}>
        <Box sx={sx.container} onClick={(e) => handleClose(e)}>
          {children}
        </Box>
      </Box>
    </Box>
  );

  function getSx() {
    return {
      background: {
        position: 'fixed',
        zIndex: 1,
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        scrollBar: 'none',
        '&::-webkit-scrollbar': {
          width: '0px',
        },
        transition: `background-color ${animation}`,
        backgroundColor: isOpen ? 'rgba(0,0,0,70%)' : 'rgba(0,0,0,0%)',
        pointerEvents: isOpen ? 'auto' : 'none',
      },
      reset: {
        zIndex: 2,
        position: 'absolute',
        width: 'min(1024px, 100%)',
        height: '100%',
      },
      container: {
        height: '100%',
        padding: '16px',
        boxSizing: 'border-box',
        transition: `transform ${animation}, opacity ${animation}`,
        // opacity: isOpen ? '100%' : '0%',
        transform: isOpen
          ? `none`
          : `translate(${transform.x}px,${transform.y}px) scale(0)`,
        '&:first-of-type': {
          '&:after': {
            content: '""',
            display: 'block',
            height: '16px',
            width: '100%',
          },
        },
      },
    };
  }
}
