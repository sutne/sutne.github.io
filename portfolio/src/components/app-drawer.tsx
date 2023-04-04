import React from 'react';
import { Box, Grid } from '@mui/material';


type props = {
  title: string;
  children: JSX.Element[] | JSX.Element;
}
export function AppDrawer({ ...props }: props) {
  if (!Array.isArray(props.children)) props.children = [props.children];
  const classes = getClasses();
  return <Box sx={classes.card}>
    <Box sx={classes.title}>{props.title}</Box>
    <Grid container sx={classes.drawer} >
      {props.children.map((child, index) => (
        <Grid item key={index}>
          {React.cloneElement(child, { ...child.props })}
        </Grid>
      ))}
    </Grid>
  </Box>;


  function getClasses() {
    return {
      card: [
        {
          height: "fit-content",
          overflow: "hidden",
          margin: "8px",
          backgroundImage: "linear-gradient(-70deg, rgba(240,240,240,0.85) 60%, rgba(240,240,240,0.95) 100%)",
          borderRadius: "16px",
          transition: "all ease-in-out 0.125s",
          boxShadow: "3px 3px 10px 1pt rgba(0,0,0, 30%)",
          // transform: "scale(1)",
          "&:hover": {
            // transform: "scale(1.01)",
            boxShadow: "5px 5px 12px 2pt rgba(0,0,0, 20%)",
          },
        },
      ],
      drawer: [{
        padding: "24px",
        boxShadow: "inset 1px 2px 4px rgba(0, 0, 0, 20%)",
      }],
      title: [{
        fontWeight: "bold",
        color: "rgb(0, 0, 0, 70%)",
        padding: "12px 16px",
        backgroundImage: "linear-gradient(70deg, rgba(221,236,250,0.45) 60%, rgba(221,236,250,0.75) 100%)",
      }],
    };
  }
}