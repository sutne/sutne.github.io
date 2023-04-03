import React from 'react';
import { Stack, useTheme } from '@mui/material';



type props = {
  children: JSX.Element[];
}
export function ItemRow({ ...props }: props): JSX.Element {
  const theme = useTheme();

  const style = {
    overflowX: "auto",
    paddingY: "0.5em",
    [theme.breakpoints.down('sm')]: {
      '&::-webkit-scrollbar': {
        height: "0.4em",
        bgcolor: "rgba(0,0,0,0)",
      },
      '&::-webkit-scrollbar-thumb': {
        bgcolor: "background.paper",
        borderRadius: "0.4em",
      }
    },
    [theme.breakpoints.up('sm')]: {
      '&::-webkit-scrollbar': {
        height: "0.8em",
        bgcolor: "rgba(0,0,0,0)",
      },
      '&::-webkit-scrollbar-thumb': {
        bgcolor: "background.paper",
        borderRadius: "0.8em",
      }
    },
  }
  return <Stack direction="row" spacing={3} sx={style}>
    {props.children}
  </Stack>
}