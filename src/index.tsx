import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "./assets/hooks/theme";
import { AuthProvider } from "./assets/hooks/auth";
import { GainsAndExpensesProvider } from "./assets/hooks/gainsAndExpenses";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <GainsAndExpensesProvider>
          <App />
        </GainsAndExpensesProvider>
      </AuthProvider>
    </ThemeProvider>
    <ToastContainer closeButton={false} position="top-right" />
  </BrowserRouter>,
);
