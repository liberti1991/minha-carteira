import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";

import { Layout } from "./assets/components/Layout";
// import { Dashboard } from "./assets/pages/Dashboard";
import { List } from "./assets/pages/List";
import GlobalStyles from "./assets/styles/createGlobalStyle";

// import { ThemeProvider } from './hooks/theme';
// import { AuthProvider } from './hooks/auth';

import {dark} from "./assets/styles/dark";
// import {light} from "./assets/styles/light";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Layout>
        {/* <Dashboard /> */}
        <List />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>,
);
