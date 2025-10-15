import type { MetaData, Response, Song } from "./service";

interface SongQueryParams {
  genre?: string | null;
  searchTerm?: string | null;
  includeMetadata?: boolean;
}

export function queryFilteredSongs(queryParams: SongQueryParams) {
  const { genre, includeMetadata, searchTerm } = queryParams;

  let data: Song[];
  const response: Response<Song[]> = {} as Response<Song[]>;

  const normalizedSearchTerm = searchTerm?.toLowerCase();

  try {
    // Please take into consideration that this is a mock implementation. In a real-world scenario, this would involve querying a database or an external API.
    // The filtering logic here is basic and intended for demonstration purposes only.
    data = JSON.parse(sessionStorage.getItem("songsDb") || "");
    const filteredData = data.filter((song) => {
      if (genre && song.genre !== genre) {
        return false;
      }

      if (!normalizedSearchTerm) {
        return true;
      }

      return song.title.toLowerCase().includes(normalizedSearchTerm);
    });

    response.data = filteredData;

    if (includeMetadata) {
      response.metaData = gatherMetadata(data);
    }
  } catch (error) {
    response.status = 500;
    response.error = error instanceof Error ? error : new Error(String(error));
  }

  return response;
}

export function queryAllSongs(includeMetadata?: boolean) {
  const response: Response<Song[]> = {} as Response;

  try {
    // Please take into consideration that this is a mock implementation. In a real-world scenario, this would involve querying a database or an external API.
    // The filtering logic here is basic and intended for demonstration purposes only.
    response.data = JSON.parse(sessionStorage.getItem("songsDb") || "");

    if (response?.data?.length && includeMetadata) {
      response.metaData = gatherMetadata(response.data);
    }
  } catch (error) {
    response.status = 500;
    response.error = error instanceof Error ? error : new Error(String(error));
  }

  return response;
}

function gatherMetadata(songs: Song[]): MetaData {
  const genreCounts: Record<string, number> = {};
  const genreSet = new Set<string>();

  songs.forEach((song) => {
    genreSet.add(song.genre);
    genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;
  });

  return {
    totalCount: songs.length,
    genres: Array.from(genreSet).sort((a, b) => a.localeCompare(b)),
    genreCounts,
  };
}

export function updateSong(song: Partial<Song>) {
  let data: Song[];
  const response: Response<Song> = {} as Response<Song>;

  try {
    // Please take into consideration that this is a mock implementation. In a real-world scenario, this would involve querying a database or an external API.
    // The filtering logic here is basic and intended for demonstration purposes only.
    data = JSON.parse(sessionStorage.getItem("songsDb") || "");

    if (!song.id) {
      throw new Error("Song ID is required for updates");
    }

    const songIndex = data.findIndex((s) => s.id === song.id);
    if (songIndex === -1) {
      throw new Error(`Song with ID ${song.id} not found`);
    }

    const updatedSong = {
      ...data[songIndex],
      ...song,
    };

    data[songIndex] = updatedSong;

    sessionStorage.setItem("songsDb", JSON.stringify(data));

    response.data = updatedSong;
    response.status = 200;
  } catch (error) {
    response.status = 500;
    response.error = error instanceof Error ? error : new Error(String(error));
  }

  return response;
}
