import type { ComponentProps } from "react";
import { card } from "./Card.css";
import type { VanExStyled } from "../VanExStyled";
import { Column } from "../FlexBox/FlexBox";

export function Card({
  children,
  styles = [],
  ...rest
}: VanExStyled<ComponentProps<"div">>) {
  return (
    <Column styles={[card, ...styles]} {...rest}>
      {children}
    </Column>
  );
}
