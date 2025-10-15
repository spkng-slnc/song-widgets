import { LibraryControls, Row } from "@ui";
import { libraryContainer, spacer } from "./SongLibrary.css";
import { SongLibraryDataContextProvider } from "./DataContext/SongLibraryDataContextProvider";
import { SongGrid, SongQueue } from "src/components/elements";

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
