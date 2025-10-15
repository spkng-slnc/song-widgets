import {
  favoriteSong,
  fetchSongs,
  type FavoriteSongRequest,
  type Song,
} from "@api/service";
import { useAsync } from "@utils/useAsync";
import { useCallback, useState, type PropsWithChildren } from "react";
import { SongLibraryDataContext } from "./SongLibraryDataContext";

async function setFavoriteSong({ id, favorite }: FavoriteSongRequest) {
  return favoriteSong({ id, favorite });
}

export function SongLibraryDataContextProvider({
  children,
}: PropsWithChildren) {
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);

  const addToQueue = useCallback((song: Song) => {
    setQueue(currentQueue => [...currentQueue, song]);
  }, []);

  const removeFromQueue = useCallback((songId: string) => {
    setQueue(currentQueue => currentQueue.filter(song => song.id !== songId));
  }, []);

  const fetchSongsCallback = useCallback(
    async () =>
      fetchSongs({
        includeMetadata: true,
        genreFilter: selectedGenre,
        searchTerm: searchTerm,
      }),
    [selectedGenre, searchTerm]
  );

  const songs = useAsync<Song[]>(fetchSongsCallback);

  return (
    <SongLibraryDataContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedGenre,
        setSelectedGenre,
        setFavoriteSong,
        songs,
        queue,
        addToQueue,
        removeFromQueue,
      }}>
      {children}
    </SongLibraryDataContext.Provider>
  );
}
