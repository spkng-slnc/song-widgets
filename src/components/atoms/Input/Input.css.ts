import { style } from "@vanilla-extract/css";
import { themeVars } from "src/theme.css";

export const input = style({
  paddingLeft: "0.875rem",
  margin: 0,
  border: `1px solid ${themeVars.color.gray}`,
  maxWidth: "16rem",
  borderRadius: "0.375rem",
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: "normal",
  backgroundColor: "transparent",
  color: themeVars.color.white,

  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${themeVars.color.ivory}`,
      outlineOffset: "-1px",
    },
  },
});
