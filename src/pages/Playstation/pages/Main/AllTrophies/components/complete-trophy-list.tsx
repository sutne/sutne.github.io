import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSessionState } from '../../../../hooks/useStorageState';
import type { CompleteTrophy } from '../../../../service/types';
import {
  CompleteTrophyCard,
  CompleteTrophyCardShimmer,
} from '../../../Game/components/complete-trophy';
import { Paginator } from '../../components/paginator';

export function CompleteTrophyList(props: {
  storageKey: string;
  isLoading: boolean;
  trophies: CompleteTrophy[] | undefined;
  earned?: boolean;
}) {
  const navigate = useNavigate();

  const maxPageElementCount = 30;

  const [pageIndex, setPageIndex] = useSessionState(props.storageKey, 0);
  const pageCount = Math.ceil(
    (props.trophies?.length ?? 0) / maxPageElementCount,
  );
  const clippedIndex = Math.max(0, Math.min(pageCount - 1, pageIndex));
  const trophies = [...(props.trophies ?? [])].slice(
    clippedIndex * maxPageElementCount,
    clippedIndex * maxPageElementCount + maxPageElementCount,
  );

  return (
    <Paginator
      pageCount={pageCount}
      currentPageIndex={clippedIndex}
      onChange={setPageIndex}
    >
      <Stack spacing='8px'>
        {props.isLoading
          ? Array(maxPageElementCount)
              .fill(null)
              .map((_, i) => `shimmer-${i}`)
              .map((key) => (
                <CompleteTrophyCardShimmer key={key} earned={props.earned} />
              ))
          : trophies?.map((trophy) => (
              <CompleteTrophyCard
                key={`${trophy.game.id}${trophy.id}`}
                trophy={trophy}
                onClick={() =>
                  navigate(
                    `/Playstation/trophies/game/${trophy.game.id}/platform/${trophy.game.platform}/trophy/${trophy.id}`,
                  )
                }
              />
            ))}
      </Stack>
    </Paginator>
  );
}
