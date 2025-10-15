import { SongGrid } from "../../components/SongGrid/SongGrid";
import { LibraryControls, Row } from "@ui";
import { libraryContainer, spacer } from "./SongLibrary.css";
import { SongLibraryDataContextProvider } from "./DataContext/SongLibraryDataContextProvider";
import { SongQueue } from "src/components/SongQueue/SongQueue";

export function SongLibrary() {
  return (
    <SongLibraryDataContextProvider>
      <LibraryControls />
      <Row styles={[spacer]} />
      <Row fullWidth styles={[libraryContainer]}>
        <SongQueue />
        <SongGrid />
      </Row>
    </SongLibraryDataContextProvider>
  );
}
