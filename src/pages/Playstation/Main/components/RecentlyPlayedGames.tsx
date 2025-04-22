import { Grid } from '@mui/material';
import { ShimmerImage } from '../../../../components/animated/shimmer';
import { Image } from '../../../../components/image';
import { Shine3D } from '../../../../components/shine-3d';
import type { RecentGame } from '../../service/types';

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
        .map((_, i) => `grid-shimmer-image-${i}`)
        .map((key) => (
          <Grid key={key} size={{ xs: 6, sm: 4, md: 3 }}>
            <ShimmerImage width='100%' sx={{ borderRadius: '7%' }} />
          </Grid>
        ))}
    </Grid>
  );
}

function GridImage(props: { src: string }) {
  return (
    <Grid size={{ xs: 6, sm: 4, md: 3 }}>
      <Shine3D sx={{ borderRadius: '7%' }}>
        <Image src={props.src} sx={{ borderRadius: '7%' }} />
      </Shine3D>
    </Grid>
  );
}
