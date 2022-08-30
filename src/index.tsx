import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "./assets/hooks/theme";
import { AuthProvider } from "./assets/hooks/auth";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <ToastContainer closeButton={false} position="top-left" />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
