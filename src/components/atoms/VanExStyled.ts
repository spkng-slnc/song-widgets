export type VanExStyled<T = { className: string }> = Omit<T, "className"> & {
  styles?: string[];
};
