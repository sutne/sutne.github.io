import { createTheme, responsiveFontSizes } from "@mui/material";

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "rgb(29,39,51)",
        paper: "rgb(44,49,62)",
      },
    },
  })
);

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#e0e0e0",
        paper: "#e0e0e0",
      },
      text: {
        primary: "rgb(13,17,23)",
      },
    },
  })
);