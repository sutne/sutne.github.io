import { KeyboardArrowLeftRounded, Minimize } from '@mui/icons-material';
import {
  alpha,
  Box,
  IconButton,
  ThemeProvider as MuiThemeProvider,
  Stack,
  type Theme,
  Typography,
} from '@mui/material';
import { useApp } from 'providers/app-provider';
import { useMainTheme } from 'providers/main-theme-provider';
import { useSettings } from 'providers/settings-provider';
import { useLocation, useNavigate } from 'react-router-dom';
import { darkTheme } from 'themes/darkTheme';
import { lightTheme } from 'themes/lightTheme';
import { ContentAnimationWrapper } from './animated/content-animation-wrapper';

export function AppContent(props: {
  name: string;
  children: React.ReactNode;
  theme?: Theme;
  lightTheme?: Theme;
  darkTheme?: Theme;
  appBarTheme?: {
    background: string;
    textColor: string;
  };
  fillWidth?: boolean;
}) {
  const { setIsOpen } = useApp();
  const { themeIsDark } = useMainTheme();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

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

  const goBack = () => navigate(-1);
  const close = () => {
    setIsOpen(props.name, false);
    setTimeout(
      () => {
        navigate('/');
      },
      settings.useAnimations ? settings.animationDuration : 0,
    );
  };

  const isAtRoot = location.pathname === `/${props.name}`;
  const sx = getSx();
  return (
    <MuiThemeProvider theme={theme}>
      <ContentAnimationWrapper name={props.name}>
        <Box sx={sx.content}>
          <Stack sx={sx.title_bar} direction='row'>
            <Box
              sx={sx.title_icon}
              component='img'
              src={
                new URL(`/src/assets/apps/${props.name}.png`, import.meta.url)
                  .href
              }
            />
            <Typography sx={sx.title_name} alignSelf='center'>
              {props.name}
            </Typography>
            {!isAtRoot && (
              <IconButton sx={sx.title_bar_button} onClick={goBack}>
                <KeyboardArrowLeftRounded sx={sx.title_bar_button_icon} />
              </IconButton>
            )}
            <IconButton sx={sx.title_bar_button} onClick={close}>
              <Minimize sx={sx.title_bar_button_icon} />
            </IconButton>
          </Stack>
          {props.children}
        </Box>
      </ContentAnimationWrapper>
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
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 70%)',
        overflow: 'hidden',
      },
      title_bar: {
        padding: '12px',
        borderRadius: `${12 + 12}px ${12 + 12}px 0 0`,
        background: appBarTheme.background,
        color: appBarTheme.textColor,
        boxShadow: '0px 3px 3px rgba(0,0,0,40%)',
      },
      title_icon: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
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
