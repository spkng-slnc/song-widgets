import { style } from "@vanilla-extract/css";
import { themeVars } from "src/theme.css";

export const button = style({
  outline: "none",
  backgroundColor: "transparent",
  border: "none",
  color: themeVars.color.ivory,
});
