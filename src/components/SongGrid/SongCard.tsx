import type { Song } from "@api/service";
import { toMinutes } from "@utils/toMinutes";
import {
  headerRow,
  songCard,
  songCardControlRow,
  songTitle,
  starIconFull,
} from "./SongGrid.css";
import { Card } from "../Card/Card";
import { Button, Row } from "@ui";
import { StarIcon } from "../Icons/StarIcon";
import { useSongLibraryDataContext } from "src/features/SongLibrary/DataContext/SongLibraryDataContext";
import { useAsync } from "@utils/useAsync";
import { SkeletonCardLoader } from "../SkeletonLoader/SkeletonLoader";
import { AddSquareIcon } from "../Icons/AddSquareIcon";

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  const { setFavoriteSong, addToQueue } = useSongLibraryDataContext();
  const {
    data,
    isLoading,
    execute: addFavorite,
  } = useAsync(
    () => setFavoriteSong({ id: song.id, favorite: !song.favorite }),
    false
  );

  if (isLoading) {
    return <SkeletonCardLoader count={1} />;
  }

  return (
    <Card styles={[songCard]}>
      <Row styles={[headerRow]}>
        <h2 className={songTitle}>{song.title}</h2>
        <Button onClick={addFavorite}>
          <StarIcon
            width="2rem"
            height="2rem"
            className={song?.favorite || data?.favorite ? starIconFull : ""}
          />
        </Button>
      </Row>
      <p>{song.album}</p>
      <p>{song.artist}</p>
      <p>{song.genre}</p>
      <p>{toMinutes(song.duration)}</p>
      <Row styles={[songCardControlRow]}>
        <Button onClick={() => addToQueue(song)}>
          <AddSquareIcon width="2rem" height="2rem" />
        </Button>
      </Row>
    </Card>
  );
}
