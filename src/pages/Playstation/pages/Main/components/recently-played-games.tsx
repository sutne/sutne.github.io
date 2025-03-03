import { Grid } from '@mui/material';
import { Image } from 'components/image';
import type { RecentGame } from '../../../service/types';

export function RecentlyPlayedGames(props: { recentGames: RecentGame[] }) {
  return (
    <Grid container spacing={'8px'}>
      {props.recentGames.map((game) => (
        <GridImage key={game.title + game.platform} src={game.image} />
      ))}
    </Grid>
  );
}

export function RecentlyPlayedGamesShimmer() {
  return (
    <Grid container spacing={'8px'}>
      {Array(12)
        .fill(null)
        .map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: required to replace "shimmer"/empty ones
          <GridImage key={i} />
        ))}
    </Grid>
  );
}

function GridImage(props: { src?: string }) {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Image src={props.src} sx={{ borderRadius: '7%' }} />
    </Grid>
  );
}
