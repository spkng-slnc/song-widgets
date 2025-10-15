import { style } from "@vanilla-extract/css";
import { themeVars } from "src/theme.css";

export const button = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "2.5rem",
  padding: `0 ${themeVars.spacing.md}`,
  margin: 0,
  outline: 0,
  border: `1px solid ${themeVars.color.lightGray}`,
  borderRadius: themeVars.spacing.xs,
  backgroundColor: themeVars.color.white,
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: 500,
  lineHeight: "1.5rem",
  color: themeVars.color.black,
  userSelect: "none",
  selectors: {
    '&[data-color="red"]': {
      color: themeVars.color.gray,
    },
    "&:active": {
      backgroundColor: themeVars.color.ivory,
    },
    "&:focus-visible": {
      outline: `2px solid ${themeVars.color.gray}`,
      outlineOffset: "-1px",
    },
    "&:hover": {
      backgroundColor: themeVars.color.ivory,
    },
  },
});

export const backdrop = style({
  position: "fixed",
  minHeight: "100dvh",
  inset: 0,
  backgroundColor: themeVars.color.black,
  opacity: 0.2,
  transition: "opacity 150ms",
  "@supports": {
    "(-webkit-touch-callout: none)": {
      position: "absolute",
    },
  },
  selectors: {
    "&[data-starting-style], &[data-ending-style]": {
      opacity: 0,
    },
  },
});

export const popup = style({
  boxSizing: "border-box",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "24rem",
  maxWidth: "calc(100vw - 3rem)",
  marginTop: "-2rem",
  padding: themeVars.spacing.xl,
  borderRadius: themeVars.spacing.sm,
  outline: `1px solid ${themeVars.color.lightGray}`,
  backgroundColor: themeVars.color.black,
  color: themeVars.color.black,
  transition: "all 150ms",
  selectors: {
    "&[data-starting-style], &[data-ending-style]": {
      opacity: 0,
      transform: "translate(-50%, -50%) scale(0.9)",
    },
  },
});

export const title = style({
  marginTop: `-${themeVars.spacing.xs}`,
  marginBottom: themeVars.spacing.xs,
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  letterSpacing: "-0.0025em",
  fontWeight: 500,
});

export const description = style({
  margin: `0 0 ${themeVars.spacing.xl}`,
  fontSize: "1rem",
  lineHeight: "1.5rem",
  color: themeVars.color.ivory,
});

export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: themeVars.spacing.md,
});
