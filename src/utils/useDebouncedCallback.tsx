import { useRef, useCallback } from "react";

type Callback<T extends unknown[]> = (...args: T) => void;

export function useDebouncedCallback<T extends unknown[]>(
  callback: Callback<T>,
  delay: number = 300
): Callback<T> {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}
