import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { useAsync } from "../useAsync";
import type { Response, MetaData } from "@api/service";

describe("useAsync", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with loading state when immediate is true", () => {
    const mockAsyncFn = vi.fn();
    const { result } = renderHook(() => useAsync(mockAsyncFn, true));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should initialize without loading state when immediate is false", () => {
    const mockAsyncFn = vi.fn();
    const { result } = renderHook(() => useAsync(mockAsyncFn, false));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should handle successful async operation", async () => {
    const mockMetaData: MetaData = {
      totalCount: 1,
      genres: ["rock"],
      genreCounts: { rock: 1 },
    };
    const mockResponse: Response<string> = {
      data: "test-data",
      error: null,
      status: 200,
      metaData: mockMetaData,
    };
    const mockAsyncFn = vi.fn().mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAsync(mockAsyncFn, true));

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe("test-data");
    expect(result.current.error).toBe(null);
    expect(result.current.status).toBe(200);
    expect(result.current.metaData).toEqual(mockMetaData);
  });

  it("should handle error in async operation", async () => {
    const error = new Error("Test error");
    const mockAsyncFn = vi.fn().mockRejectedValue(error);

    const { result } = renderHook(() => useAsync(mockAsyncFn, true));

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(error);
    expect(result.current.status).toBe(500);
  });

  it("should execute async function manually when immediate is false", async () => {
    const mockResponse: Response<string> = {
      data: "test-data",
      error: null,
      status: 200,
    };

    // Create a delayed promise
    const mockAsyncFn = vi
      .fn()
      .mockImplementation(
        () =>
          new Promise((resolve) => setTimeout(() => resolve(mockResponse), 100))
      );

    const { result } = renderHook(() => useAsync(mockAsyncFn, false));

    expect(mockAsyncFn).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);

    let promise: Promise<void>;
    act(() => {
      promise = result.current.execute();
    });

    // Advance timer slightly to allow React state update to process
    await vi.advanceTimersByTimeAsync(1);
    expect(result.current.isLoading).toBe(true);

    // Complete the async operation
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
      await promise;
    });

    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe("test-data");
  });

  it("should handle response with error field", async () => {
    const responseError = new Error("API Error");
    const mockResponse: Response<string> = {
      data: null,
      error: responseError,
      status: 500,
    };
    const mockAsyncFn = vi.fn().mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAsync(mockAsyncFn, true));

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(responseError);
    expect(result.current.status).toBe(500);
  });
});
