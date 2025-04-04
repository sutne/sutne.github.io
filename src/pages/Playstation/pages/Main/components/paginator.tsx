import { Stack, Typography } from '@mui/material';

export function Paginator(props: {
  pageCount: number;
  currentPageIndex: number;
  onChange: (newPageIndex: number) => void;
}) {
  if (props.pageCount <= 1) return <></>;
  const currentPage = Math.min(props.currentPageIndex, props.pageCount - 1);

  const firstPages = Array(Math.min(2, 1 + currentPage))
    .fill(null)
    .map((_, i) => i)
    .filter((i) => i >= 0);
  const lastPages = Array(Math.min(2, props.pageCount - currentPage))
    .fill(null)
    .map((_, i) => props.pageCount - 1 - i)
    .filter((i) => firstPages[firstPages.length - 1] < i && i < props.pageCount)
    .reverse();
  const currentPages = Array(5)
    .fill(null)
    .map((_, i) => currentPage - (i - Math.floor(5 / 2)))
    .filter((i) => firstPages[firstPages.length - 1] < i && i < lastPages[0])
    .reverse();

  const sx = getSx();
  return (
    <Stack
      direction='row'
      spacing='18px'
      justifyContent='center'
      alignItems='center'
      sx={sx.bar}
    >
      <Typography
        onClick={() =>
          currentPage > 0 ? props.onChange(currentPage - 1) : undefined
        }
        sx={{
          ...sx.page,
          opacity: currentPage > 0 ? 1 : 0.3,
          cursor: currentPage > 0 ? 'pointer' : 'default',
        }}
      >
        {'<'}
      </Typography>
      {firstPages.map((page) => (
        <Page
          key={page}
          index={page}
          isCurrent={page === currentPage}
          onClick={() => props.onChange(page)}
        />
      ))}
      {firstPages[firstPages.length - 1] < currentPages[0] - 1 && (
        <Typography sx={sx.page}>...</Typography>
      )}
      {currentPages.map((page) => (
        <Page
          key={page}
          index={page}
          isCurrent={page === currentPage}
          onClick={() => props.onChange(page)}
        />
      ))}
      {currentPages[currentPages.length - 1] < lastPages[0] - 1 && (
        <Typography sx={sx.page}>...</Typography>
      )}
      {lastPages.map((page) => (
        <Page
          key={page}
          index={page}
          isCurrent={page === currentPage}
          onClick={() => props.onChange(page)}
        />
      ))}
      <Typography
        onClick={() =>
          currentPage < props.pageCount - 1
            ? props.onChange(currentPage + 1)
            : undefined
        }
        sx={{
          ...sx.page,
          opacity: currentPage < props.pageCount - 1 ? 1 : 0.3,
          cursor: currentPage < props.pageCount - 1 ? 'pointer' : 'default',
        }}
      >
        {'>'}
      </Typography>
    </Stack>
  );
  function getSx() {
    return {
      bar: {
        padding: '24px',
      },
      page: {
        fontSize: '18px',
        cursor: 'pointer',
        color: 'text.secondary',
      },
    };
  }
}

function Page(props: {
  index: number;
  isCurrent: boolean;
  onClick: (index: number) => void;
}) {
  const sx = getSx();
  return (
    <Typography onClick={() => props.onClick(props.index)} sx={sx.page}>
      {props.index + 1}
    </Typography>
  );
  function getSx() {
    return {
      page: [
        {
          fontSize: '18px',
          cursor: 'pointer',
          color: 'text.secondary',
          '&:hover': {
            color: 'text.primary',
          },
        },
        props.isCurrent && {
          fontWeight: 900,
          textDecoration: 'underline',
          color: 'text.primary',
        },
      ],
    };
  }
}
