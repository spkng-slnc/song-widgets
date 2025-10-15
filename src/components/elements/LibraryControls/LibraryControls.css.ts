import { style } from "@vanilla-extract/css";
import { themeVars } from "src/theme.css";

export const searchInput = style({
  paddingLeft: "0.875rem",
  margin: 0,
  border: `1px solid ${themeVars.color.gray}`,
  width: "100%",
  maxWidth: "16rem",
  height: "2.5rem",
  borderRadius: "0.375rem",
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: "normal",
  backgroundColor: "transparent",
  color: themeVars.color.black,

  selectors: {
    "&:focus": {
      outline: `2px solid ${themeVars.color.lightGray}`,
      outlineOffset: "-1px",
    },
  },
});

export const controlRow = style({
  width: "100%",
  gap: themeVars.spacing.sm,
  justifyContent: "flex-end",
});

export const select = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
  height: "2.5rem",
  paddingLeft: "0.875rem",
  paddingRight: "0.75rem",
  margin: 0,
  outline: 0,
  border: `1px solid ${themeVars.color.gray}`,
  borderRadius: "0.375rem",
  fontFamily: "inherit",
  fontSize: "1rem",
  lineHeight: "1.5rem",
  color: themeVars.color.white,
  cursor: "default",
  WebkitUserSelect: "none",
  userSelect: "none",
  minWidth: "9rem",

  selectors: {
    "&:hover": {
      backgroundColor: themeVars.color.lightGray,
    },
    "&[data-popup-open]": {
      backgroundColor: themeVars.color.black,
    },
    "&:focus-visible": {
      outline: "2px solid var(--color-blue)",
      outlineOffset: "-1px",
    },
  },
});
export const selectIcon = style({
  display: "flex",
});

export const positioner = style({
  outline: "none",
  zIndex: 1,
  WebkitUserSelect: "none",
  userSelect: "none",
});

export const popup = style({
  boxSizing: "border-box",
  borderRadius: "0.375rem",
  backgroundColor: "canvas",
  backgroundClip: "padding-box",
  color: "var(--color-gray-900)",
  transformOrigin: "var(--transform-origin)",
  transition: "transform 150ms, opacity 150ms",

  selectors: {
    "&[data-starting-style], &[data-ending-style]": {
      opacity: 0,
      transform: "scale(0.9)",
    },
    "&[data-side='none']": {
      transition: "none",
      transform: "none",
      opacity: 1,
    },
  },
});

export const list = style({
  boxSizing: "border-box",
  position: "relative",
  paddingBlock: "0.25rem",
  overflowY: "auto",
  maxHeight: "var(--available-height)",
  scrollPaddingBlock: "1.5rem",
});

export const item = style({
  boxSizing: "border-box",
  outline: 0,
  fontSize: "0.875rem",
  lineHeight: "1rem",
  paddingBlock: "0.5rem",
  paddingLeft: "0.625rem",
  paddingRight: "1rem",
  minWidth: "var(--anchor-width)",
  display: "grid",
  gap: "0.5rem",
  alignItems: "center",
  gridTemplateColumns: "0.75rem 1fr",
  cursor: "default",
  WebkitUserSelect: "none",
  userSelect: "none",

  selectors: {
    "[data-side='none'] &": {
      fontSize: "1rem",
      paddingRight: "3rem",
      minWidth: "calc(var(--anchor-width) + 1rem)",
    },
    "&[data-highlighted]": {
      zIndex: 0,
      position: "relative",
      color: "var(--color-gray-50)",
    },
    "&[data-highlighted]::before": {
      content: "''",
      zIndex: -1,
      position: "absolute",
      insetBlock: 0,
      insetInline: "0.25rem",
      borderRadius: "0.25rem",
      backgroundColor: "var(--color-gray-900)",
    },
  },
});
export const itemIndicator = style({
  gridColumnStart: 1,
});

export const itemIndicatorIcon = style({
  display: "block",
  width: "0.75rem",
  height: "0.75rem",
});

export const itemText = style({
  gridColumnStart: 2,
});

export const scrollArrow = style({
  width: "100%",
  background: "canvas",
  zIndex: 1,
  textAlign: "center",
  cursor: "default",
  borderRadius: "0.375rem",
  height: "1rem",
  fontSize: "0.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
    },
    "&[data-direction='up'][data-side='none']::before": {
      top: "-100%",
    },
    "&[data-direction='down']": {
      bottom: 0,
    },
    "&[data-direction='down'][data-side='none']::before": {
      bottom: "-100%",
    },
  },
});
