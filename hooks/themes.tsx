import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    secondary: {
      main: "#3a4852",
    },
  },
});

export const darkTheme = createMuiTheme({
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

const jumboTheme = createMuiTheme({
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
