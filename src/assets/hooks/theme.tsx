import React, { createContext, useContext, useState } from "react";

import { dark } from "../styles/dark";
import { light } from "../styles/light";

interface IthemeContext {
  toggleTheme(): void;
  theme: ITheme;
}

interface ITheme {
  title: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    white: string;
    black: string;
    gray: string;
    success: string;
    info: string;
    warning: string;
  };
}

interface IProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<IthemeContext>({} as IthemeContext);

const ThemeProvider: React.FC<IProps> = ({ children }) => {
  const [theme, themeSet] = useState<ITheme>(() => {
    const themeSaved = localStorage.getItem("@MinhaCarteira:theme");
    if (themeSaved) {
      return JSON.parse(themeSaved);
    } else {
      return dark;
    }
  });

  const toggleTheme = () => {
    if (theme.title === "dark") {
      themeSet(light);
      localStorage.setItem("@MinhaCarteira:theme", JSON.stringify(light));
    } else {
      themeSet(dark);
      localStorage.setItem("@MinhaCarteira:theme", JSON.stringify(dark));
    }
  };

  return <ThemeContext.Provider value={{ toggleTheme, theme }}>{children}</ThemeContext.Provider>;
};

function useTheme(): IthemeContext {
  const context = useContext(ThemeContext);
  return context;
}

export { ThemeProvider, useTheme };
