import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./assets/styles/createGlobalStyle";

import { useTheme } from "./assets/hooks/theme";

import { MyRoutes } from "./assets/routes/MyRoutes";

export const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MyRoutes />
    </ThemeProvider>
  );
};
