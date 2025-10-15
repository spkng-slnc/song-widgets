import { queryAllSongs, queryFilteredSongs, updateSong } from "./controller";

export interface FetchSongsRequest {
  includeMetadata?: boolean;
  genreFilter?: string | null;
  searchTerm?: string | null;
}

export interface MetaData {
  totalCount: number;
  genres: string[];
  genreCounts: Record<string, number>;
}

export interface Response<T = []> {
  status: 200 | 404 | 500;
  data?: T | null;
  metaData?: MetaData | null;
  error?: Error | null;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  favorite?: boolean;
}

export async function fetchSongs(
  request?: FetchSongsRequest
): Promise<Response<Song[]>> {
  let response: Response<Song[]>;

  if (request?.genreFilter || request?.searchTerm) {
    response = queryFilteredSongs({
      genre: request.genreFilter,
      searchTerm: request.searchTerm,
      includeMetadata: request.includeMetadata,
    });
  } else {
    response = queryAllSongs(request?.includeMetadata);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 500);
  });
}

export interface FavoriteSongRequest {
  id: string;
  favorite: boolean;
}
export async function favoriteSong({ id, favorite }: FavoriteSongRequest) {
  const response: Response<Song> = updateSong({ id, favorite });
  return new Promise<Response<Song>>((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 300);
  });
}
