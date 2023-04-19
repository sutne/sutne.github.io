import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyboardArrowLeftRounded, Minimize } from '@mui/icons-material';
import {
  alpha,
  Box,
  IconButton,
  Stack,
  Theme,
  ThemeProvider as MuiThemeProvider,
  Typography,
} from '@mui/material';

import { useApp } from 'providers/app-provider';
import { darkTheme } from 'providers/darkTheme';
import { lightTheme } from 'providers/lightTheme';
import { useMainTheme } from 'providers/main-theme-provider';

export function AppContent(props: {
  name: string;
  children: JSX.Element;
  theme?: Theme;
  lightTheme?: Theme;
  darkTheme?: Theme;
  appBarTheme?: {
    background: string;
    textColor: string;
  };
  fillWidth?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    setIsOpen(true);
  }, []);
  const animationMs = 300;

  const navigate = useNavigate();
  const location = useLocation();
  const { themeIsDark } = useMainTheme();

  const themeThatIsDark = props.theme ?? props.darkTheme ?? darkTheme;
  const themeThatIsLight = props.theme ?? props.lightTheme ?? lightTheme;
  const theme = themeIsDark ? themeThatIsDark : themeThatIsLight;

  const appBarTheme = props.appBarTheme ?? {
    background: `linear-gradient(180deg, 
      ${alpha(theme.palette.background.paper, 1)} 0%, 
      ${alpha(theme.palette.background.paper, 0.4)} 100%
    )`,
    textColor: theme.palette.text.primary,
  };

  const isAtRoot = location.pathname == `/${props.name}`;

  const sx = getSx();
  return (
    <MuiThemeProvider theme={theme}>
      <AppContentWrapper
        name={props.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        animationMs={animationMs}
      >
        <Box sx={sx.content}>
          <Stack sx={sx.title_bar} direction='row'>
            <Box
              sx={sx.title_icon}
              component='img'
              src={require(`assets/apps/${props.name}.png`)}
            />
            <Typography sx={sx.title_name} alignSelf='center'>
              {props.name}
            </Typography>
            {!isAtRoot && (
              <IconButton sx={sx.title_bar_button} onClick={() => navigate(-1)}>
                <KeyboardArrowLeftRounded sx={sx.title_bar_button_icon} />
              </IconButton>
            )}
            <IconButton
              sx={sx.title_bar_button}
              onClick={() => {
                setIsOpen(false);
                // wait for animation to finish
                setTimeout(() => {
                  navigate('/');
                }, animationMs);
              }}
            >
              <Minimize sx={sx.title_bar_button_icon} />
            </IconButton>
          </Stack>
          {props.children}
        </Box>
      </AppContentWrapper>
    </MuiThemeProvider>
  );

  function getSx() {
    return {
      content: {
        width: { xs: '100%', sm: props.fillWidth ? '100%' : 'fit-content' },
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
      title_bar_button: {
        alignSelf: 'center',
        height: '2em',
        width: '2em',
        margin: '0 8px',
        color: appBarTheme.textColor,
        '&:hover': {
          bgcolor: 'transparent',
        },
      },
      title_bar_button_icon: {
        fontSize: '1.3em',
      },
    };
  }
}

export function AppContentWrapper(props: {
  name: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animationMs: number;
  children: JSX.Element;
}) {
  const navigate = useNavigate();
  const { iconReferences } = useApp();
  const icon = iconReferences.get(props.name);

  // want to target the center of the app icon
  const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
  const [target, setTarget] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    if (!icon?.current) return;
    setTarget({
      x: icon.current.x + icon.current.clientWidth / 2,
      y: icon.current.y + icon.current.clientHeight / 2,
    });
  }, [icon]);

  React.useEffect(() => {
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
    if (e.target !== e.currentTarget) return;
    props.setIsOpen(false);
    setTimeout(() => {
      navigate('/');
    }, props.animationMs);
  };

  const animation = `${props.animationMs}ms ease-in`;
  const sx = getSx();
  return (
    <Box sx={sx.background} onClick={(e) => handleClose(e)}>
      <Box sx={sx.reset} onClick={(e) => handleClose(e)}>
        <Box sx={sx.container} onClick={(e) => handleClose(e)}>
          {props.children}
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
        backgroundColor: props.isOpen ? 'rgba(0,0,0,70%)' : 'rgba(0,0,0,0%)',
        pointerEvents: props.isOpen ? 'auto' : 'none',
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
        opacity: { xs: props.isOpen ? 1 : 0, sm: 1 },
        transform: {
          xs: 'none',
          sm: props.isOpen
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
