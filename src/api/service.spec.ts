import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchSongs } from "./service";
import * as controller from "./controller";

// Mock the controller
vi.mock("./controller", () => ({
  queryFilteredSongs: vi.fn(),
  queryAllSongs: vi.fn(),
}));

describe("Song Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should pass both genre and search term to queryFilteredSongs", async () => {
    const mockRequest = {
      genreFilter: "Rock",
      searchTerm: "highway",
      includeMetadata: true,
    };

    await fetchSongs(mockRequest);

    expect(controller.queryFilteredSongs).toHaveBeenCalledWith({
      genre: "Rock",
      searchTerm: "highway",
      includeMetadata: true,
    });
  });

  it("should pass search term alone to queryFilteredSongs", async () => {
    const mockRequest = {
      searchTerm: "sweet",
      includeMetadata: true,
    };

    await fetchSongs(mockRequest);

    expect(controller.queryFilteredSongs).toHaveBeenCalledWith({
      genre: undefined,
      searchTerm: "sweet",
      includeMetadata: true,
    });
  });
});
