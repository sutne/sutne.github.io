import { Box, Grid2 as Grid, Typography, alpha } from '@mui/material';
import { Image } from 'components/image';
import { useMainTheme } from 'providers/main-theme-provider';

export function PersonalCard() {
  const { theme } = useMainTheme();

  const sx = getSx();
  return (
    <Box sx={sx.card}>
      <Grid
        container
        size={12}
        spacing={2}
        alignItems='center'
        justifyContent={'center'}
        textAlign='center'
      >
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Image
            src={new URL('assets/me.png', import.meta.url).href}
            size='192px'
            sx={{
              borderRadius: '100%',
              margin: 'auto',
              boxShadow: '0px 2px 7px rgba(0, 0, 0, 30%)',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 8 }} alignContent={'center'}>
          <Box style={{ padding: '16px' }}>
            <Typography variant='h4' color='text.primary' marginBottom='3mm'>
              Sivert Utne
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Consultant at Bouvet ASA
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  function getSx() {
    return {
      card: {
        display: 'flex',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '3px 3px 10px 1pt rgba(0,0,0, 30%)',
        backdropFilter: 'blur(4px)',
        background: `linear-gradient(30deg, 
          ${alpha(theme.palette.background.paper, 0.45)} 20%, 
          ${alpha(theme.palette.background.paper, 0.65)} 40%, 
          ${alpha(theme.palette.background.paper, 0.85)} 90%, 
          ${alpha(theme.palette.background.paper, 1)} 100%
        )`,
      },
    };
  }
}
