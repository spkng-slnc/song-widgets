import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const card = style({
  borderRadius: themeVars.spacing.sm,
  padding: themeVars.spacing.md,
  backgroundColor: themeVars.color.lightGray,
  color: themeVars.color.white,
});
