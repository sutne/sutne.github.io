import React from 'react';
import { Box } from "@mui/material";


export function ProfilePicture() {
  const classes = getClasses();
  return (
    <Box sx={classes.image} component="img" src={require("assets/me.png")} alt="me" />
  );
  function getClasses() {
    return {
      image: [
        {
          width: "5cm",
          height: "5cm",
          borderRadius: "50%",
          margin: "auto",
          position: "relative",
          boxShadow: "0px 2px 7px rgba(0, 0, 0, 30%)",
        },
      ],
    };
  }
}

