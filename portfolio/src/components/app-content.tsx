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
  const { name, close, isOpen } = useApp();

  const animationDuration = isOpen ? 750 : 350;

  const sx = getSx();
  return (
    <>
      <Fade in={isOpen} timeout={animationDuration}>
        <Box sx={sx.open_background} onClick={() => close()} />
      </Fade>
      <Zoom in={isOpen} timeout={animationDuration}>
        <Box sx={sx.content_wrapper}>
          <Box sx={sx.content}>
            <Stack direction='row' sx={sx.title}>
              <Box sx={sx.title_icon} component='img'
                src={require(`assets/apps/${name}.png`)}
              />
              <Typography alignSelf='center' sx={sx.app_name}>{name}</Typography>
              <IconButton sx={sx.close_button} onClick={() => close()}><Minimize /></IconButton>
            </Stack>
            <Box sx={sx.app_content}>
              {children}
            </Box>
          </Box>
        </Box>
      </Zoom>
    </>
  );

  function getSx() {
    return {
      close_button: [{
        alignSelf: 'center',
        height: '2em',
        width: '2em',
      }],
      open_background: [
        {
          zIndex: '100',
          position: 'fixed',
          top: '0',
          left: '0',
          height: '100%',
          width: '100%',
          bgcolor: 'rgba(0, 0, 0, 25%)',
        },
      ],
      content_wrapper: [{
        zIndex: '150',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: 'min(1024px, 100%)',
        margin: 'auto',
        paddingY: '2em',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '0',
        },
      }],
      content: [{
        zIndex: '200',
        position: 'relative',
        borderRadius: '16px',
        height: 'fit-content',
        maxWidth: '90%',
        margin: '3mm auto',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 50%)',
      }],
      title: [{
        padding: '12px',
        background: `linear-gradient(0deg, 
          ${alpha(theme.palette.background.paper, 0.4)} 0%,
          ${alpha(theme.palette.background.paper, 1)} 100%
        )`,
      }],
      title_icon: [{
        width: '3em',
        height: '3em',
        borderRadius: '25%',
      }],
      app_name: [{
        paddingLeft: '16px',
        fontSize: '1.5em',
        lineHeight: '100%',
        width: '100%',
      }],
      app_content: [{
        padding: '24px',
        boxShadow: 'inset 0px 3px 3px rgba(0,0,0,40%)',
      }],
    };
  }
}