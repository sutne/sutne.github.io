import React from 'react';
import { Box, Typography } from '@mui/material';

type props = {
  url: string;
  text: string;
};
export function Hyperlink({...props}: props){
  const classes = getClasses();

  function onClick(){
    window.open(props.url, "_blank");
  }

  return <Box onClick={()=> onClick()}>
  <Typography sx={classes.link}>
    {props.text}
  </Typography>
  </Box>

  function getClasses() {
    return {
      link: [
        {
          color: "rgb(97,175,239)",
          cursor: "pointer",
        },
      ],
    };
  }
}

export function Email(props: { children: string }){
  return <Hyperlink text={props.children} url={`mailto:${props.children}`}/>
}