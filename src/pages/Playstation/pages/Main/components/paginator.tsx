import {
  ChevronLeft,
  ChevronRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

export function Paginator(props: {
  pageCount: number;
  currentPageIndex: number;
  onChange: (newPageIndex: number) => void;
  children: React.ReactNode;
}) {
  if (props.pageCount <= 1) return <>{props.children}</>;
  return (
    <>
      <PaginatorRow {...props} position='top' />
      {props.children}
      <PaginatorRow {...props} position='bottom' />
    </>
  );
}

function PaginatorRow(props: {
  pageCount: number;
  currentPageIndex: number;
  onChange: (newPageIndex: number) => void;
  position: 'top' | 'bottom';
}) {
  const min = 0;
  const curr = props.currentPageIndex;
  const count = props.pageCount;
  const max = count - 1;

  const sx = getSx();
  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      sx={sx.bar}
    >
      {count <= 7 ? (
        Array(count)
          .fill(null)
          .map((_, i) => i)
          .map((pageIndex) => (
            <PageBox
              key={pageIndex}
              onClick={() => props.onChange(pageIndex)}
              isCurrent={curr === pageIndex}
            >
              {pageIndex + 1}
            </PageBox>
          ))
      ) : (
        <>
          {/* First page */}
          <PageBox onClick={() => props.onChange(min)} isCurrent={curr === min}>
            1
          </PageBox>

          {/* Second Page, or fast forwards down */}
          {curr <= 3 ? (
            <PageBox onClick={() => props.onChange(1)} isCurrent={curr === 1}>
              2
            </PageBox>
          ) : (
            <PageBox onClick={() => props.onChange(Math.max(0, curr - 5))}>
              <KeyboardDoubleArrowLeft />
            </PageBox>
          )}

          {/* Third Page, or move down */}
          {curr <= 3 ? (
            <PageBox onClick={() => props.onChange(2)} isCurrent={curr === 2}>
              3
            </PageBox>
          ) : (
            <PageBox onClick={() => props.onChange(curr - 1)}>
              <ChevronLeft />
            </PageBox>
          )}

          {/* Fourth Page or Fourth Last Page or Current Page */}
          {curr <= 3 ? (
            <PageBox onClick={() => props.onChange(3)} isCurrent={curr === 3}>
              4
            </PageBox>
          ) : curr >= max - 3 ? (
            <PageBox
              onClick={() => props.onChange(max - 3)}
              isCurrent={curr === max - 3}
            >
              {max - 3 + 1}
            </PageBox>
          ) : (
            <PageBox isCurrent={true}>{curr + 1}</PageBox>
          )}

          {/* Third Last Page, or move up */}
          {curr >= max - 3 ? (
            <PageBox
              onClick={() => props.onChange(max - 2)}
              isCurrent={curr === max - 2}
            >
              {max - 2 + 1}
            </PageBox>
          ) : (
            <PageBox onClick={() => props.onChange(curr + 1)}>
              <ChevronRight />
            </PageBox>
          )}

          {/* Second Last Page, or fast-forward up */}
          {curr >= max - 3 ? (
            <PageBox
              onClick={() => props.onChange(max - 1)}
              isCurrent={curr === max - 1}
            >
              {max - 1 + 1}
            </PageBox>
          ) : (
            <PageBox onClick={() => props.onChange(Math.min(max, curr + 5))}>
              <KeyboardDoubleArrowRight />
            </PageBox>
          )}

          {/* Last Page */}
          <PageBox onClick={() => props.onChange(max)} isCurrent={curr === max}>
            {max + 1}
          </PageBox>
        </>
      )}
    </Stack>
  );
  function getSx() {
    return {
      bar: {
        maxWidth: '100%',
        paddingTop: `${props.position === 'top' ? '0px' : '12px'}`,
        paddingBottom: `${props.position === 'bottom' ? '12px' : '12px'}`,
      },
    };
  }
}

function PageBox(props: {
  children: React.ReactNode;
  isCurrent?: boolean;
  onClick?: () => void;
}) {
  const sx = getSx();
  return (
    <Box sx={sx.box} onClick={props.onClick}>
      {props.children}
    </Box>
  );
  function getSx() {
    return {
      box: {
        height: '1.5rem',
        minWidth: '1.5rem',
        padding: '0 0.5rem',
        cursor: 'pointer',
        color: props.isCurrent ? 'text.primary' : 'text.secondary',
        fontWeight: props.isCurrent ? 900 : 400,
        fontSize: { xs: '12px', sm: '18px' },
        fontFamily: 'monospace',
        textDecoration: props.isCurrent ? 'underline' : 'none',
        textAlign: 'center',
        verticalAlign: 'center',
        '&:hover': {
          color: 'text.primary',
        },
      },
    };
  }
}
