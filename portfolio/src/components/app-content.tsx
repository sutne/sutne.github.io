import React from 'react';
import { Minimize } from '@mui/icons-material';
import { alpha, Box, Fade, IconButton, Stack, Typography, Zoom } from '@mui/material';

import { useApp } from 'providers/app-provider';
import { useTheme } from 'providers/theme-provider';


type props = {
  children: JSX.Element
}
export function AppContent({ children }: props) {

  const { theme } = useTheme();
  const { name, close } = useApp();

  const sx = getSx();
  return (
    <AppContentWrapper>
      <Box sx={sx.content}>
        <Stack direction='row' sx={sx.title}>
          <Box sx={sx.title_icon} component='img'
            src={require(`assets/apps/${name}.png`)}
          />
          <Typography sx={sx.app_name} alignSelf='center'>{name}</Typography>
          <IconButton sx={sx.close_button} onClick={() => close()}><Minimize /></IconButton>
        </Stack>
        <Box sx={sx.app_content}>
          {children}
        </Box>
      </Box>
    </AppContentWrapper>
  );

  function getSx() {
    return {
      content: {
        width: { xs: '100%', sm: 'fit-content' },
        margin: 'auto',
        maxWidth: '100%',
        height: 'fit-content',
        borderRadius: '16px',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 70%)',
      },
      title: {
        padding: '12px',
        background: `linear-gradient(0deg, 
          ${alpha(theme.palette.background.paper, 0.4)} 0%,
          ${alpha(theme.palette.background.paper, 1)} 100%
        )`,
        boxShadow: '0px 3px 3px rgba(0,0,0,40%)',
      },
      title_icon: {
        width: '3em',
        height: '3em',
        borderRadius: '25%',
      },
      app_name: {
        paddingX: '16px',
        fontSize: '1.5em',
        lineHeight: '100%',
        width: '100%',
      },
      close_button: {
        alignSelf: 'center',
        height: '2em',
        width: '2em',
        color: theme.palette.text.primary,
      },
      app_content: {
        padding: '24px',
      },
    };
  }
}




type wrapper_props = {
  children: JSX.Element
}
export function AppContentWrapper({ children }: wrapper_props) {

  const { close, isOpen } = useApp();
  const animationDuration = isOpen ? 750 : 350;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      close();
    }
  };

  const sx = getSx();
  return (
    <>
      <Fade in={isOpen} timeout={animationDuration}>
        <Box sx={sx.background} onClick={handleClick} >
          <Box sx={sx.reset} onClick={handleClick}>
            <Box sx={sx.container} onClick={handleClick}>
              <Zoom in={isOpen} timeout={animationDuration}>
                {children}
              </Zoom>
            </Box>
          </Box>
        </Box>
      </Fade>
    </>
  );

  function getSx() {
    return {
      background: {
        zIndex: 1,
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,70%)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0em',
        },
      },
      reset: {
        zIndex: 1,
        position: 'absolute',
        width: 'min(1024px, 100%)',
      },
      container: {
        margin: '16px',
      },
    };
  }
}