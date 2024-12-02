import React from 'react';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';

import { useSorting } from 'providers/sort-provider';

export function SortButton(props: { type: string }) {
  const { sorting, setSorting } = useSorting();
  const theme = useTheme();

  const isSelected = sorting.type === props.type;
  const isAscending = sorting.order === 'asc';

  const handleClick = () => {
    if (isSelected) {
      setSorting((prev) => {
        return {
          type: prev.type,
          order: prev.order === 'asc' ? 'desc' : 'asc',
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
  return (
    <Box sx={sx.container} onClick={handleClick}>
      <Stack sx={sx.content} direction='row' spacing={1} alignItems={'center'}>
        {isSelected && <KeyboardArrowDownRounded sx={sx.icon} />}
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
          color: 'text.secondary',
          borderRadius: '20px',
          '&:hover': {
            backgroundColor: alpha(theme.palette.text.secondary, 0.15),
            color: 'text.primary',
          },
          cursor: 'pointer',
        },
        isSelected && {
          border: '1px solid',
          color: 'text.primary',
        },
      ],
      label: {
        whiteSpace: 'nowrap',
      },
      icon: {
        height: '18px',
        width: '18px',
        fontSize: '22px',
        marginLeft: '-8px',
        transition: 'transform 0.2s ease-in-out',
        transform: isAscending ? 'rotate(0deg)' : 'rotate(180deg)',
      },
      content: {
        margin: '1mm 4mm 1mm 4mm',
      },
    };
  }
}
