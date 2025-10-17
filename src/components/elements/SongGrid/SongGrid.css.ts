import { style } from "@vanilla-extract/css";
import { themeVars } from "src/theme.css";

export const songCard = style([
  {
    minHeight: 200,
    gap: themeVars.spacing.sm,
  },
]);

export const songTitle = style({});
export const headerRow = style({
  justifyContent: "space-between",
});

export const starIconFull = style([
  {
    fill: themeVars.color.ivory,
  },
]);

export const songCardControlRow = style({
  gap: themeVars.spacing.md,
  justifyContent: "flex-end",
  marginTop: "auto",
});

export const emptyState = style({
  justifyContent: "center",
  alignItems: "center",
});

export const songGridWrapper = style({
  flex: 1,
});
