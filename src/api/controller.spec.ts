import { describe, beforeEach, it, expect, vi } from "vitest";
import { queryFilteredSongs, queryAllSongs, updateSong } from "./controller";
import type { Song } from "./service";

const mockStorage: { [key: string]: string } = {};
const mockSessionStorage = {
  getItem: vi.fn((key: string) => mockStorage[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockStorage[key] = value;
  }),
  clear: vi.fn(() => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  }),
};

vi.stubGlobal("sessionStorage", mockSessionStorage);

describe("Song Controller", () => {
  const mockSongs: Song[] = [
    {
      id: "1",
      title: "Sweet Dreams",
      artist: "Artist 1",
      genre: "Pop",
      duration: 180,
      album: "Album 1",
    },
    {
      id: "2",
      title: "Highway Star",
      artist: "Artist 2",
      genre: "Rock",
      duration: 240,
      album: "Album 2",
    },
    {
      id: "3",
      title: "Blue Moon",
      artist: "Artist 3",
      genre: "Jazz",
      duration: 195,
      album: "Album 3",
    },
  ];

  beforeEach(() => {
    mockSessionStorage.clear();
    vi.clearAllMocks();
    mockSessionStorage.setItem("songsDb", JSON.stringify(mockSongs));
  });

  describe("queryFilteredSongs", () => {
    it("should filter songs while maintaining complete metadata", () => {
      const result = queryFilteredSongs({
        genre: "Rock",
        searchTerm: "highway",
        includeMetadata: true,
      });

      // Check filtered results
      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.data![0].title).toBe("Highway Star");

      // Check metadata reflects complete dataset
      expect(result.metaData).toBeDefined();
      expect(result.metaData?.totalCount).toBe(3);
      expect(result.metaData?.genres).toEqual(["Jazz", "Pop", "Rock"]);
      expect(result.metaData?.genreCounts).toEqual({
        Pop: 1,
        Rock: 1,
        Jazz: 1,
      });
    });

    it("should filter by search term only when no genre is selected", () => {
      const result = queryFilteredSongs({
        searchTerm: "sweet",
        includeMetadata: true,
      });

      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.data![0].title).toBe("Sweet Dreams");
    });

    it("should filter by both genre and search term when both are provided", () => {
      const result = queryFilteredSongs({
        genre: "Pop",
        searchTerm: "sweet",
        includeMetadata: true,
      });

      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.data![0].title).toBe("Sweet Dreams");

      // Should find no results when genre doesn't match
      const noResults = queryFilteredSongs({
        genre: "Rock",
        searchTerm: "sweet",
        includeMetadata: true,
      });
      expect(noResults.data).toHaveLength(0);
    });
  });

  describe("queryAllSongs", () => {
    it("should return all songs with metadata when requested", () => {
      const result = queryAllSongs(true);

      expect(result.data).toHaveLength(3);
      expect(result.metaData).toBeDefined();
      expect(result.metaData?.totalCount).toBe(3);
      expect(result.metaData?.genres).toHaveLength(3);
      expect(result.metaData?.genres).toEqual(["Jazz", "Pop", "Rock"]);
      expect(result.metaData?.genreCounts).toEqual({
        Pop: 1,
        Rock: 1,
        Jazz: 1,
      });
    });
  });

  describe("updateSong", () => {
    it("should update an existing song and return the updated version", () => {
      const updatedSongData = {
        id: "1",
        title: "Sweet Dreams (Remix)",
        duration: 195,
      };

      const result = updateSong(updatedSongData);

      expect(result.status).toBe(200);
      expect(result.data).toMatchObject({
        ...mockSongs[0],
        ...updatedSongData,
      });

      // Verify the update was persisted to sessionStorage
      const storedSongs = JSON.parse(sessionStorage.getItem("songsDb") || "[]");
      expect(storedSongs[0].title).toBe("Sweet Dreams (Remix)");
      expect(storedSongs[0].duration).toBe(195);
    });
  });
});
