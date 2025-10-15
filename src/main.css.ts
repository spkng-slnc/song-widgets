import { globalStyle } from "@vanilla-extract/css";
import { themeClass, themeVars } from "./theme.css";

globalStyle("body", {
  margin: 0,
  fontSize: 16,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle(":root", {
  colorScheme: "dark",
});

globalStyle(`body:not(.${themeClass})`, {
  display: "none",
});

globalStyle("div", {
  boxSizing: "border-box",
});

globalStyle("h1, h2, p", {
  margin: 0,
  color: themeVars.color.white,
});

globalStyle("#root", {
  height: "100vh",
});
