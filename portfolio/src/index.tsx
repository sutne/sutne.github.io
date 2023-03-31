import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box } from '@mui/material';

import { Main }  from 'pages/Main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const style = [{
  width: "min(1024px, 100%)",
  margin: "0 auto",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  WebKitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
}]
 
root.render(
  <React.StrictMode>
    <Box sx={style}>
      <Main />
    </Box>
  </React.StrictMode>
);


