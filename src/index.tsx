import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { MyRoutes } from "./assets/routes/MyRoutes";
import GlobalStyles from "./assets/styles/createGlobalStyle";

// import { ThemeProvider } from './hooks/theme';
// import { AuthProvider } from './hooks/auth';

import {dark} from "./assets/styles/dark";
// import {light} from "./assets/styles/light";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={dark}>
      <GlobalStyles />
        <MyRoutes />
    </ThemeProvider>
  </BrowserRouter>,
);
