import { Box, alpha, useTheme } from '@mui/material';
import type { JSX } from 'react';

export function RepoCard(props: { name?: string; children: JSX.Element }) {
  const theme = useTheme();

  const sx = getSx();
  return <Box sx={sx.container}>{props.children}</Box>;

  function getSx() {
    return {
      container: {
        position: 'relative',
        bgcolor: 'background.paper',
        borderRadius: '6px',
        padding: '16px',
        border: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
      },
    };
  }
}
