import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SongGrid } from "./SongGrid";
import * as DataContext from "src/features/SongLibrary/DataContext/SongLibraryDataContext";
import type { Song } from "@api/service";

const mockSongs: Song[] = [
  {
    id: "1",
    title: "Sweet Dreams",
    artist: "Artist 1",
    genre: "Pop",
    duration: 180,
    album: "Album 1",
    favorite: false,
  },
  {
    id: "2",
    title: "Highway Star",
    artist: "Artist 2",
    genre: "Rock",
    duration: 240,
    album: "Album 2",
    favorite: true,
  },
];

describe("SongGrid", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should render a grid of songs when songs are available", () => {
    // Mock the context hook to return our test data
    vi.spyOn(DataContext, "useSongLibraryDataContext").mockReturnValue({
      songs: {
        isLoading: false,
        error: null,
        data: mockSongs,
        execute: async () => {},
        status: 200,
        metaData: null,
      },
      searchTerm: null,
      setSearchTerm: vi.fn(),
      selectedGenre: null,
      setSelectedGenre: vi.fn(),
      setFavoriteSong: vi.fn(),
      queue: [],
      addToQueue: vi.fn(),
      removeFromQueue: vi.fn(),
    });

    render(<SongGrid />);

    // Verify songs are rendered
    expect(screen.getByText("Sweet Dreams")).toBeInTheDocument();
    expect(screen.getByText("Highway Star")).toBeInTheDocument();
    expect(screen.getByText("Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Artist 2")).toBeInTheDocument();
  });

  it("should render a loading skeleton when songs are loading", () => {
    vi.spyOn(DataContext, "useSongLibraryDataContext").mockReturnValue({
      songs: {
        isLoading: true,
        error: null,
        data: null,
        execute: async () => {},
        status: 200,
        metaData: null,
      },
      searchTerm: null,
      setSearchTerm: vi.fn(),
      selectedGenre: null,
      setSelectedGenre: vi.fn(),
      setFavoriteSong: vi.fn(),
      queue: [],
      addToQueue: vi.fn(),
      removeFromQueue: vi.fn(),
    });

    render(<SongGrid />);

    // The SkeletonCardLoader should be rendered when loading
    const skeletonCards = screen.getAllByTestId("skeleton-card");
    expect(skeletonCards).toHaveLength(3); // Default count is 3
    expect(skeletonCards[0]).toBeInTheDocument();
  });

  it("should render empty state message when no songs are available", () => {
    vi.spyOn(DataContext, "useSongLibraryDataContext").mockReturnValue({
      songs: {
        isLoading: false,
        error: null,
        data: [],
        execute: async () => {},
        status: 200,
        metaData: null,
      },
      searchTerm: null,
      setSearchTerm: vi.fn(),
      selectedGenre: null,
      setSelectedGenre: vi.fn(),
      setFavoriteSong: vi.fn(),
      queue: [],
      addToQueue: vi.fn(),
      removeFromQueue: vi.fn(),
    });

    render(<SongGrid />);

    // Verify empty state message is shown
    expect(
      screen.getByText("Sorry! There's nothing here. Try your search again?")
    ).toBeInTheDocument();
  });
});
