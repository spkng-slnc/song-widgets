import type { ComponentProps, MouseEventHandler } from "react";
import type { VanExStyled } from "../VanExStyled";
import { button } from "./Button.css";

export function Button({
  children,
  onClick,
  styles,
  ...rest
}: VanExStyled<ComponentProps<"button">>) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick?.(e);
  };

  return (
    <button
      className={`${button} ${styles?.join(" ")}`}
      onClick={handleClick}
      {...rest}>
      {children}
    </button>
  );
}
