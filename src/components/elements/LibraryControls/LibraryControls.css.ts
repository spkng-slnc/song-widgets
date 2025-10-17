import { style } from "@vanilla-extract/css";
import { themeVars } from "src/theme.css";

export const controlRow = style({
  width: "100%",
  gap: themeVars.spacing.sm,
  justifyContent: "flex-end",
});
