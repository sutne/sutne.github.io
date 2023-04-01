import React from 'react'
import { Box } from '@mui/material'


type props = {
  name: string;
  onClick?: () => void;
};

export function App({ ...props }: props) {
  const classes = getClasses();



  return (
    <Box sx={classes.app} onClick={props.onClick}>
      <Box
        sx={classes.icon}
        component="img"
        src={require(`assets/apps/${props.name}.png`)}
      />
      <Box sx={classes.name}>{props.name}</Box>
    </Box>
  )

  function getClasses() {
    return {
      app: [{
        width: "24mm",
        height: "fit-content",
        textAlign: "center",
        cursor: "pointer",
        transition: "all ease-in-out 0.125s",
        transform: "scale(1)",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }
      ],
      icon: [
        {
          width: "18mm",
          height: "18mm",
          borderRadius: "25%",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 30%)",
        },
      ],
      name: [
        {
          margin: "1mm 0",
          fontSize: "0.8em",
          color: "rgba(0, 0, 0, 80%)",
          textWrap: "wrap",
          overflowWrap: "break-word",
        },
      ],
    };
  }
}