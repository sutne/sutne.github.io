import React from 'react';
import { Box } from "@mui/material";

type props = {
  children: JSX.Element | JSX.Element[] | string;
};
export function Card({...props}:props) {
  const classes = getClasses();
  
  return (
    <Box sx={classes.card}>
     {props.children}
    </Box>
  );

  function getClasses() {
    return {
      card: [
        {
          height: "fit-content",
          width: "100%",
          padding: "16px",
          borderRadius: "16px",
          margin: "16px",
          position: "relative",
          transition: "all ease-in-out 0.125s",
          boxShadow: "3px 3px 10px 1pt rgba(0,0,0, 30%)",
          transform: "scale(1)",
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: "5px 5px 12px 2pt rgba(0,0,0, 20%)",
          },
        }
      ],
    };
  }
}