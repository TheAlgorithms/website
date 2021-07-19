import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

export const lightTheme = createTheme({
  palette: {
    type: "light",
    secondary: {
      main: "#3a4852",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#00BCB4",
    },
    secondary: {
      main: "#3a4852",
    },
    background: {
      default: "#101316",
      paper: "#20282D",
    },
  },
});

const jumboTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

export function JumboThemeProvider({ children }) {
  return <ThemeProvider theme={jumboTheme}>{children}</ThemeProvider>;
}
