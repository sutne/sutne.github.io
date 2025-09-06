import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export function TabBar() {
  const root = '/Playstation/trophies';
  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Stack sx={sx.bar} direction='row' spacing={1}>
        <Tab path={root}>Games</Tab>
        <Tab path={`${root}/log`}>Log</Tab>
        <Tab path={`${root}/advisor`}>Advisor</Tab>
        <Tab path={`${root}/stats`}>Stats</Tab>
      </Stack>
    </Box>
  );
  function getSx() {
    return {
      container: {
        width: '100%',
        display: 'flex',
        marginBottom: '16px',
        alignItems: 'center',
        justifyContent: 'center',
      },
      bar: {
        width: 'fit-content',
        padding: '8px',
        borderRadius: '64px',
        bgcolor: 'background.paper',
      },
    };
  }
}

function Tab(props: { path: string; children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isCurrentPath = location.pathname === props.path;

  const sx = getSx();
  return (
    <Box sx={sx.tab} onClick={() => navigate(props.path, { replace: true })}>
      <Typography sx={sx.label}>{props.children}</Typography>
    </Box>
  );
  function getSx() {
    const theme = useTheme();
    return {
      tab: {
        border: `1px ${isCurrentPath ? 'solid' : 'dashed'}`,
        color: isCurrentPath ? 'text.primary' : 'text.secondary',
        borderRadius: '64px',
        cursor: isCurrentPath ? 'default' : 'pointer',
        padding: '4px 16px',
        '&:hover': {
          backgroundColor: isCurrentPath
            ? 'transparent'
            : alpha(theme.palette.text.secondary, 0.15),
          color: 'text.primary',
        },
      },
      label: {
        fontSize: '16px',
        textAlign: 'center',
      },
    };
  }
}
