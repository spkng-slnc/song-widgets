import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LibraryControls } from "./LibraryControls";
import * as DataContext from "src/features/SongLibrary/DataContext/SongLibraryDataContext";

describe("LibraryControls", () => {
  const mockMetadata = {
    genres: ["Rock", "Pop", "Jazz"],
    totalCount: 5,
    genreCounts: {
      Rock: 2,
      Pop: 2,
      Jazz: 1,
    },
  };

  it("should call setSearchTerm", async () => {
    const user = userEvent.setup();
    const setSearchTerm = vi.fn();
    vi.spyOn(DataContext, "useSongLibraryDataContext").mockReturnValue({
      songs: {
        isLoading: false,
        error: null,
        data: [],
        execute: async () => {},
        status: 200,
        metaData: mockMetadata,
      },
      searchTerm: "",
      setSearchTerm,
      selectedGenre: null,
      setSelectedGenre: vi.fn(),
      setFavoriteSong: vi.fn(),
      queue: [],
      addToQueue: vi.fn(),
      removeFromQueue: vi.fn(),
    });

    render(<LibraryControls />);

    const searchInput = screen.getByPlaceholderText("Search");
    await user.type(searchInput, "test search");

    // Wait for debounce
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(setSearchTerm).toHaveBeenCalledWith("test search");
  });

  it("should show genre filter options and handle genre selection", async () => {
    const user = userEvent.setup();
    const setSelectedGenre = vi.fn();
    vi.spyOn(DataContext, "useSongLibraryDataContext").mockReturnValue({
      songs: {
        isLoading: false,
        error: null,
        data: [],
        execute: async () => {},
        status: 200,
        metaData: mockMetadata,
      },
      searchTerm: null,
      setSearchTerm: vi.fn(),
      selectedGenre: null,
      setSelectedGenre,
      setFavoriteSong: vi.fn(),
      queue: [],
      addToQueue: vi.fn(),
      removeFromQueue: vi.fn(),
    });

    render(<LibraryControls />);

    const genreSelect = screen.getByText("Filter By Genre");
    await user.click(genreSelect);

    expect(screen.getByText("All Genres")).toBeInTheDocument();
    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByText("Pop")).toBeInTheDocument();
    expect(screen.getByText("Jazz")).toBeInTheDocument();

    await user.click(screen.getByText("Rock"));
    expect(setSelectedGenre).toHaveBeenCalledWith("Rock");

    await user.click(genreSelect);
    await user.click(screen.getByText("All Genres"));
    expect(setSelectedGenre).toHaveBeenCalledWith(null);
  });
});
