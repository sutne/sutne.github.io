import React from 'react';
import { Box } from "@mui/material";


export function ProfilePicture() {
  const classes = getClasses();
  return (
    <Box sx={classes.image} component="img" src={require("assets/me.png")} alt="me"/>
  );
  function getClasses() {
    return {
      image: [
        {
          width: "5cm",
          height: "5cm",
          borderRadius: "50%",
          margin: "auto",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 20%)",
        },
      ],
    };
  }
}

