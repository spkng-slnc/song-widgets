import { style } from "@vanilla-extract/css";
import { themeVars } from "src/theme.css";

export const queuedItem = style({
  justifyContent: "space-between",
  alignItems: "flex-end",
});

export const queueColumn = style({
  gap: themeVars.spacing.lg,
  minWidth: 250,
});
