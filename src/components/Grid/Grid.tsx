import type { ComponentProps } from "react";
import { grid } from "./Grid.css";
import type { VanExStyled } from "../VanExStyled";

export function Grid({ children, styles }: VanExStyled<ComponentProps<"div">>) {
  return <div className={`${grid} ${styles?.join(" ")}`}>{children}</div>;
}
