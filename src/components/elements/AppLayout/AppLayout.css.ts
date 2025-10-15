import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const appLayout = style({
  padding: themeVars.spacing.xl,
  backgroundColor: themeVars.color.black,
  minHeight: "100%",
});
