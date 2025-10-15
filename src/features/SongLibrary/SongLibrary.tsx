import { LibraryControls } from "@chems/elements";
import { Row } from "@chems/atoms";
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
