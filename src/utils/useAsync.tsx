import { useCallback, useEffect, useState } from "react";
import type { Response } from "@api/service";

interface AsyncState<T> extends Partial<Response<T>> {
  isLoading: boolean;
}

type AsyncFunction<T> = () => Promise<Response<T>>;

export function useAsync<T>(asyncFunction: AsyncFunction<T>, immediate = true) {
  const [state, setState] = useState<AsyncState<T>>({
    isLoading: immediate,
    error: null,
    data: null,
  });

  const execute = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await asyncFunction();
      setState({
        isLoading: false,
        error: response.error || null,
        data: response.data,
        metaData: response.metaData,
        status: response.status,
      });
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
        data: null,
        status: 500,
      });
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
  };
}
