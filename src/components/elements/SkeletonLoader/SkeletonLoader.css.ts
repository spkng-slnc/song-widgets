import { keyframes, style } from "@vanilla-extract/css";
import { themeVars } from "src/theme.css";

const shimmer = keyframes({
  "0%": {
    backgroundPosition: "-1250px 0",
  },
  "100%": {
    backgroundPosition: "1250px 0",
  },
});

export const skeleton = style({
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  borderRadius: "8px",
  position: "relative",
  overflow: "hidden",
  "::after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(90deg, transparent 10%, ${themeVars.color.black} 50%, transparent 90%)`,
    animation: `${shimmer} 4s infinite linear`,
  },
});

export const skeletonCard = style({
  gap: themeVars.spacing.sm,
});

export const skeletonTitle = style({
  width: "100%",
  height: themeVars.spacing.xl,
});

export const skeletonText = style({
  width: "80%",
  height: "1em",
});
