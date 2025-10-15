import { createTheme } from "@vanilla-extract/css";

export const [themeClass, themeVars] = createTheme({
  color: {
    black: "#2d232e",
    gray: "#474448",
    lightGray: "#534b52",
    ivory: "#e0ddcf",
    white: "#f1f0ea",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
});
