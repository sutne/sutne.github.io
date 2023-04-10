import React, { useEffect, useState } from 'react';
import { Minimize } from '@mui/icons-material';
import { alpha, Box, IconButton, Stack, Typography } from '@mui/material';

import { useApp } from 'providers/app-provider';

import { AppBarTheme } from './app';

type props = {
  children: JSX.Element;
  appBarTheme?: AppBarTheme;
};
export function AppContent({ ...props }: props) {
  const { theme, name, close } = useApp();

  const appBarTheme = props.appBarTheme ?? {
    background: `linear-gradient(180deg, 
      ${alpha(theme.palette.background.paper, 1)} 0%,
      ${alpha(theme.palette.background.paper, 0.4)} 100%
    )`,
    textColor: theme.palette.text.primary,
  };

  const sx = getSx();
  return (
    <AppContentWrapper>
      <Box sx={sx.content}>
        <Stack sx={sx.title_bar} direction='row'>
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
        {props.children}
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
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 70%)',
      },
      title_bar: {
        padding: '12px',
        borderRadius: '16px 16px 0 0',
        background: appBarTheme.background,
        color: appBarTheme.textColor,
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
        color: appBarTheme.textColor,
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
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!iconReference?.current) return;
    setTarget({
      x: iconReference.current.x + iconReference.current.clientWidth / 2,
      y: iconReference.current.y + iconReference.current.clientHeight / 2,
    });
  }, [iconReference]);

  useEffect(() => {
    // apps are center, so origin is center of screen
    setOrigin({
      x: document.body.clientWidth / 2,
      y: document.body.clientHeight / 2,
    });
  }, [document.body.clientWidth, document.body.clientHeight]);

  // translation from origin to target
  const transform = {
    x: target.x - origin.x,
    y: target.y - origin.y,
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.target === e.currentTarget) close();
  };

  const animation = '300ms ease-in';
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
        opacity: { xs: isOpen ? 1 : 0, sm: 1 },
        transform: {
          xs: 'none',
          sm: isOpen
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
      },
    };
  }
}
