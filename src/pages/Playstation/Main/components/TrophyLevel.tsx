import { Box, Stack, Typography } from '@mui/material';
import { getTrophyLevelImage } from '../../util/util';

export function TrophyLevel(props: { level: number }) {
  const icon = new URL(
    `../../assets/levels/${getTrophyLevelImage(props.level)}`,
    import.meta.url,
  ).href;

  const shadow = {
    xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
    sm: 'drop-shadow(0 3px 5px rgba(0,0,0,50%))',
  };
  const sx = getSx();
  return (
    <Stack
      direction='column'
      alignItems='center'
      justifyContent='center'
      spacing='12px'
    >
      <Box sx={sx.image} component='img' src={icon} />
      <Typography sx={sx.text}>Level {props.level}</Typography>
    </Stack>
  );

  function getSx() {
    return {
      image: {
        width: '100%',
        maxWidth: { xs: '92px', sm: '128px' },
        filter: shadow,
        WebkitFilter: shadow,
      },
      text: {
        position: 'relative',
        top: { xs: '0', sm: '-10px' },
        textAlign: 'center',
        fontWeight: 300,
        fontSize: { xs: '14px', sm: '18px', md: '24px' },
      },
    };
  }
}
