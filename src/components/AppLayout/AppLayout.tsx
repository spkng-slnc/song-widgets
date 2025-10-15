import type { ComponentProps } from "react";
import { appLayout } from "./AppLayout.css";

export function AppLayout({
  children,
  ...rest
}: Omit<ComponentProps<"div">, "className">) {
  return (
    <div className={appLayout} {...rest}>
      {children}
    </div>
  );
}
