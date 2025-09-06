import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { alpha, Box, Stack, useTheme } from '@mui/material';
import { useRef } from 'react';

export function Paginator(props: {
  pageCount: number;
  currentPageIndex: number;
  onChange: (newPageIndex: number) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  if (props.pageCount <= 1) return <>{props.children}</>;

  const onChangeTopWrapper = async (newPageIndex: number) => {
    props.onChange(newPageIndex);
    if (newPageIndex === props.pageCount - 1) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const onChangeBottomWrapper = (newPageIndex: number) => {
    props.onChange(newPageIndex);
    if (newPageIndex < props.pageCount - 1) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <div ref={ref}>
      <PaginatorRow
        position='top'
        {...{ ...props, onChange: onChangeTopWrapper }}
      />
      {props.children}
      <PaginatorRow
        position='bottom'
        {...{ ...props, onChange: onChangeBottomWrapper }}
      />
    </div>
  );
}

function PaginatorRow(props: {
  pageCount: number;
  currentPageIndex: number;
  onChange: (newPageIndex: number) => void;
  position: 'top' | 'bottom';
}) {
  const theme = useTheme();

  const min = 0;
  const curr = props.currentPageIndex;
  const count = props.pageCount;
  const max = count - 1;

  const Page = ({ index }: { index: number }) => {
    return (
      <PageBox onClick={() => props.onChange(index)} isCurrent={curr === index}>
        {index + 1}
      </PageBox>
    );
  };

  const FastRewind = () => {
    return (
      <PageBox onClick={() => props.onChange(curr - 5)}>
        <KeyboardDoubleArrowLeft fontSize='medium' />
      </PageBox>
    );
  };

  const FastForward = () => {
    return (
      <PageBox onClick={() => props.onChange(curr + 5)}>
        <KeyboardDoubleArrowRight fontSize='medium' />
      </PageBox>
    );
  };

  const sx = getSx();
  return (
    <Box sx={sx.wrapper}>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={sx.bar}
      >
        {count <= 7 ? (
          interval(0, max).map((page) => <Page key={page} index={page} />)
        ) : curr < 4 ? (
          <>
            {interval(0, 4).map((page) => (
              <Page key={page} index={page} />
            ))}
            <FastForward />
            <Page index={max} />
          </>
        ) : curr < max - 3 ? (
          <>
            <Page index={min} />
            <FastRewind />
            {interval(curr - 1, curr + 1).map((page) => (
              <Page key={page} index={page} />
            ))}
            <FastForward />
            <Page index={max} />
          </>
        ) : (
          <>
            <Page index={min} />
            <FastRewind />
            {interval(max - 4, max).map((page) => (
              <Page key={page} index={page} />
            ))}
          </>
        )}
      </Stack>
    </Box>
  );

  function getSx() {
    return {
      wrapper: {
        margin: '8px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        overflow: 'auto',
      },
      bar: {
        padding: '8px 12px',
        background: alpha(theme.palette.background.paper, 0.5),
        border: '1px solid',
        borderColor: 'background.paper',
        borderRadius: '32px',
      },
    };
  }
}

/** inclusive, ex `start=4` `end=7` => `[4,5,6,7]` */
function interval(start: number, end: number) {
  return Array(1 + end - start)
    .fill(null)
    .map((_, i) => start + i);
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '1.5rem',
        minWidth: '1.5rem',
        padding: '0 0.5rem',
        fontSize: { xs: '14px', sm: '18px' },
        fontFamily: 'monospace',
        color: props.isCurrent ? 'text.primary' : 'text.secondary',
        fontWeight: props.isCurrent ? 900 : 400,
        userSelect: 'none',
        cursor: 'pointer',
        '&:hover': {
          color: 'text.primary',
        },
      },
    };
  }
}
