import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#00BCB4",
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
