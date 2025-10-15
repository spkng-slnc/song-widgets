import type { ComponentProps } from "react";
import type { VanExStyled } from "../VanExStyled";
import { column, flex, fullWidthStyle, row } from "./FlexBox.css";

interface FlexBoxProps extends VanExStyled<ComponentProps<"div">> {
  fullWidth?: boolean;
  fullHeight?: boolean;
  flexEnd?: boolean;
}

export function Column({ children, styles, ...rest }: FlexBoxProps) {
  return (
    <div className={`${flex} ${column} ${styles?.join(" ")}`} {...rest}>
      {children}
    </div>
  );
}
export function Row({
  children,
  styles,
  fullWidth = false,
  ...rest
}: FlexBoxProps) {
  return (
    <div
      className={`${flex} ${row} ${fullWidth ? fullWidthStyle : ""} ${styles?.join(" ")}`}
      {...rest}>
      {children}
    </div>
  );
}
