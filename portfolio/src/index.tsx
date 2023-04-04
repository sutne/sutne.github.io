import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box } from '@mui/material';

import { Main } from 'pages/Main';

const style = {
  root: [
    {
      width: "100vw",
      height: "100vh",
      overflow: "auto",
      backgroundImage: `url(${require("assets/background.png")})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }],
  content: [
    {
      width: "min(1024px, 100%)",
      margin: "0 auto",
      height: "100%",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      fontSmoothing: "antialiased",
      WebKitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
  ],
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
document.body.style.margin = "0px";
document.body.style.padding = "0px";

root.render(
  <React.StrictMode>
    <Box sx={style.root}>
      <Box sx={style.content}>
        <Main />
      </Box>
    </Box>
  </React.StrictMode>,
);


