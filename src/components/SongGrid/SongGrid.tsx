import { SkeletonCardLoader } from "../SkeletonLoader/SkeletonLoader";
import { SongCard } from "./SongCard";
import { Column, Grid } from "@ui";
import { useSongLibraryDataContext } from "src/features/SongLibrary/DataContext/SongLibraryDataContext";
import { emptyState, songGridWrapper } from "./SongGrid.css";

export function SongGrid() {
  const { songs } = useSongLibraryDataContext();

  if (songs?.isLoading) {
    return (
      <Column styles={[songGridWrapper]}>
        <Grid>
          <SkeletonCardLoader />
        </Grid>
      </Column>
    );
  }

  if (!songs?.data?.length) {
    return (
      <Column styles={[emptyState, songGridWrapper]}>
        <h2>Sorry! There's nothing here. Try your search again?</h2>
      </Column>
    );
  }

  return (
    <Column styles={[songGridWrapper]}>
      <Grid>
        {songs.data.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </Grid>
    </Column>
  );
}
