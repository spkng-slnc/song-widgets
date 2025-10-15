import type { favoriteSong, Song } from "@api/service";
import type { useAsync } from "@utils/useAsync";
import { createContext, useContext } from "react";

interface ISongLibraryDataContext {
  searchTerm: string | null;
  setSearchTerm: (value: string | null) => void;
  selectedGenre: string | null;
  setSelectedGenre: (value: string | null) => void;
  setFavoriteSong: ({
    id,
    favorite,
  }: {
    id: string;
    favorite: boolean;
  }) => ReturnType<typeof favoriteSong>;
  songs: ReturnType<typeof useAsync<Song[]>> | null;
  queue: Song[];
  addToQueue: (song: Song) => void;
  removeFromQueue: ({
    songId,
    queueIndex,
  }: {
    songId: string;
    queueIndex: number;
  }) => void;
}

export const SongLibraryDataContext = createContext<ISongLibraryDataContext>({
  searchTerm: null,
  setSearchTerm: function (): void {
    throw new Error("Function not implemented.");
  },
  selectedGenre: null,
  setSelectedGenre: function (): void {
    throw new Error("Function not implemented.");
  },
  setFavoriteSong: function (): ReturnType<typeof favoriteSong> {
    throw new Error("Function not implemented.");
  },
  songs: null,
  queue: [],
  addToQueue: function (): void {
    throw new Error("Function not implemented.");
  },
  removeFromQueue: function (): void {
    throw new Error("Function not implemented.");
  },
});

export function useSongLibraryDataContext() {
  const context = useContext(SongLibraryDataContext);

  if (!context) throw Error("Song library data context unavailble.");

  return context;
}
