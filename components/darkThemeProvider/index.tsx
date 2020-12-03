import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

export default function DarkThemeProvider({ children }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
