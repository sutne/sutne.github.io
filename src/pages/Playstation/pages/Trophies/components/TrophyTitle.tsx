import { Box } from '@mui/material';
import {
  TrophyProgressCard,
  TrophyProgressCardShimmer,
} from 'pages/Playstation/components/trophy-progress-card';
import { useNavigate } from 'react-router-dom';
import type { TrophyGame } from '../../../service/types';

export function TrophyTitle({ game }: { game: TrophyGame }) {
  const navigate = useNavigate();

  const titlePath = `/Playstation/trophies/game/${game.platform
    .map((info) => info.id)
    .join(',')}/platform/${game.platform
    .map((info) => info.platform)
    .join(',')}`;
  return (
    <Box onClick={() => navigate(titlePath)}>
      <TrophyProgressCard
        image={game.image}
        title={game.title}
        progress={game.progress}
        trophyCount={game.trophyCount}
        earnedCount={game.earnedCount}
        platform={game.platform}
      />
    </Box>
  );
}

export function TrophyTitleShimmer() {
  return <TrophyProgressCardShimmer />;
}
