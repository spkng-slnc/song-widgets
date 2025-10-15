import { style } from "@vanilla-extract/css";
import { themeVars } from "src/theme.css";

export const spacer = style({
  width: "100%",
  marginBottom: themeVars.spacing.lg,
});

export const libraryContainer = style({
  gap: themeVars.spacing.lg,
});
