import { Input as BaseUiInput } from "@base-ui-components/react";
import type { VanExStyled } from "../VanExStyled";
import { input } from "./Input.css";

export function Input({ ...rest }: VanExStyled<BaseUiInput.Props>) {
  return <BaseUiInput className={input} {...rest} />;
}
