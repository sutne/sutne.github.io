import React from 'react';
import { alpha, Box } from '@mui/material';

import { useApp } from 'providers/app-provider';

type props = {
  name?: string;
};
export function RepoCard({ ...props }: props & { children: JSX.Element }) {
  const { theme } = useApp();

  const sx = getSx();
  return <Box sx={sx.container}>{props.children}</Box>;

  function getSx() {
    return {
      container: {
        position: 'relative',
        bgcolor: theme.palette.background.paper,
        borderRadius: '6px',
        padding: '16px',
        border: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
      },
    };
  }
}
