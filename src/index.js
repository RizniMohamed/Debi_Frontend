import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './Store/store';
import Theme from './Theme/theme'
import Views from './Routes/Views';
import Header from "./Components/Header"
import { Toolbar } from '@mui/material'

// import Dialogs from './Dialogs/Dialogs';

const rootID = document.getElementById('root');
const root = ReactDOM.createRoot(rootID);
const theme = createTheme(Theme)


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Toolbar />
          <Views />
          {/* <Dialogs /> */}
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
