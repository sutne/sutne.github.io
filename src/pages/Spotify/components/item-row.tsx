import { alpha, Box, Stack, useTheme } from '@mui/material';

export function ItemRow(props: { children: React.ReactNode }) {
  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Stack direction='row' spacing={3} sx={sx.row}>
        {props.children}
      </Stack>
    </Box>
  );

  function getSx() {
    const theme = useTheme();
    return {
      container: {
        overflow: 'visible',
        position: 'relative',
        marginRight: '-24px',
        marginLeft: '-24px',
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: 'none',
          width: '100%',
          height: '95%',
          backgroundImage: `linear-gradient(to right,
        ${theme.palette.background.default},
        rgba(0, 0, 0, 0) 1% 98%,
        ${theme.palette.background.default})`,
        },
      },
      row: {
        overflowX: 'auto',
        paddingX: '24px',
        paddingY: '0.5em',
        '&::-webkit-scrollbar': {
          height: { xs: '0.4em', sm: '0.8em' },
          borderRadius: { xs: '0.4em', sm: '0.8em' },
          bgcolor: alpha(theme.palette.background.paper, 0.3),
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'background.paper',
          borderRadius: { xs: '0.4em', sm: '0.8em' },
        },
      },
    };
  }
}
