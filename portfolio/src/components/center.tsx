import React from 'react';
import { Box } from '@mui/material';


type props = {
  children: JSX.Element | JSX.Element[] | string;
};
export function Center({...props}: props){
  const style = [{
    textAlign: "center",
  }]
  return (
    <Box sx={style}>
      {props.children}
    </Box>
  );
}