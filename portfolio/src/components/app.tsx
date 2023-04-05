import React, { useState } from 'react';
import { Minimize } from '@mui/icons-material';
import { Box, Fade, Grow, IconButton, Stack, Typography } from '@mui/material';

import { useTheme } from 'providers/theme-provider';


type props = {
  children: JSX.Element;
  name: string;
  bgcolor?: string;
  color?: string;
};

export function App({ ...props }: props) {
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const animationDuration = open ? 750 : 350;
  const classes = getClasses();
  return (
    <>
      <Box sx={classes.app_icon} onClick={() => setOpen(true)}>
        <Box
          sx={classes.icon}
          component='img'
          src={require(`assets/apps/${props.name}.png`)}
        />
        <Box sx={classes.name}>{props.name}</Box>
      </Box>
      <Fade in={open} timeout={animationDuration}>
        <Box sx={classes.open_background} onClick={() => setOpen(false)} />
      </Fade>
      <Grow in={open} timeout={animationDuration}>
        <Box sx={classes.content_wrapper}>
          <Box sx={classes.content}>
            <Stack direction='row' sx={classes.title}>
              <Box sx={classes.title_icon} component='img'
                src={require(`assets/apps/${props.name}.png`)}
              />
              <Typography alignSelf='center' sx={classes.app_name}>{props.name}</Typography>
              <IconButton sx={classes.close_button} onClick={() => setOpen(false)}><Minimize /></IconButton>
            </Stack>
            <Box sx={classes.app_content}>{props.children}</Box>
          </Box>
        </Box>
      </Grow>
    </>
  );

  function getClasses() {
    return {
      app_icon: [{
        width: '24mm',
        height: 'fit-content',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all ease-in-out 0.125s',
        transform: 'scale(1)',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      },
      ],
      icon: [
        {
          width: '18mm',
          height: '18mm',
          borderRadius: '25%',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 30%)',
        },
      ],
      name: [
        {
          margin: '1mm 0',
          fontSize: '0.8em',
          color: 'rgba(0, 0, 0, 80%)',
          textWrap: 'wrap',
          overflowWrap: 'break-word',
        },
      ],
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
        margin: '10mm auto',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 50%)',
      }],
      title: [{
        padding: '12px',
        bgcolor: theme.palette.background.paper,
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