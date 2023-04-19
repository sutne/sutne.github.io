import React from 'react';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';
import { Box, Stack, Typography, useTheme } from '@mui/material';

import { SortType, useSorting } from '../providers/sort-provider';

export function SortButton(props: { type: SortType }) {
  const { sorting, setSorting } = useSorting();
  const theme = useTheme();

  const isSelected = sorting.type == props.type;

  const handleClick = () => {
    if (isSelected) {
      setSorting((prev) => {
        return {
          type: prev.type,
          order: prev.order == 'asc' ? 'desc' : 'asc',
        };
      });
    } else {
      setSorting({
        type: props.type,
        order: 'asc',
      });
    }
  };

  const sx = getSx();
  const Icon = () => {
    return sorting.order == 'asc' ? (
      <KeyboardArrowDownRounded sx={sx.icon} />
    ) : (
      <KeyboardArrowUpRounded sx={sx.icon} />
    );
  };

  return (
    <Box sx={sx.container} onClick={handleClick}>
      <Stack sx={sx.content} direction='row' spacing={1} alignItems={'center'}>
        {isSelected && <Icon />}
        <Typography sx={sx.label} variant='body2'>
          {props.type}
        </Typography>
      </Stack>
    </Box>
  );
  function getSx() {
    return {
      container: [
        {
          border: '1px dashed',
          color: theme.palette.text.secondary,
          borderRadius: '20px',
          backgroundColor: 'background.default',
          '&:hover': {
            backgroundColor: 'background.paper',
            color: theme.palette.text.primary,
          },
          cursor: 'pointer',
        },
        isSelected && {
          border: '1px solid',
        },
      ],
      label: [
        {
          whiteSpace: 'nowrap',
          color: 'text.secondary',
        },
        isSelected && {
          whiteSpace: 'nowrap',
          color: 'text.primary',
        },
      ],
      icon: {
        color: 'text.primary',
        marginLeft: '-8px',
      },
      content: {
        margin: '1mm 4mm 1mm 4mm',
      },
    };
  }
}
