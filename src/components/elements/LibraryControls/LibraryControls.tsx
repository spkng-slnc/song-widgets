import { controlRow } from "./LibraryControls.css";
import { Row, Select, SelectItem } from "@chems/atoms";
import { Input } from "@chems/atoms/Input/Input";
import { useDebouncedCallback } from "@utils/useDebouncedCallback";
import { useState } from "react";
import { useSongLibraryDataContext } from "src/features/SongLibrary/DataContext/SongLibraryDataContext";

export function LibraryControls() {
  const { songs, selectedGenre, setSelectedGenre, setSearchTerm } =
    useSongLibraryDataContext();
  const [search, setSearch] = useState<string | null>();

  const debouncedOnSearchChange = useDebouncedCallback(setSearchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedOnSearchChange(value);
  };

  const handleSelectGenre = (value: string | null) => {
    setSelectedGenre(value);
  };

  return (
    <Row styles={[controlRow]}>
      <Input
        placeholder="Search"
        value={search || ""}
        onChange={handleSearchChange}
      />
      {!!songs?.metaData?.genres && (
        <Select
          value={selectedGenre}
          onValueChange={
            handleSelectGenre as unknown as Parameters<
              typeof Select
            >[0]["onValueChange"]
          }
          placeholder="Filter by Genre">
          <SelectItem label="All Genres" value={null} />
          {songs.metaData.genres.map((genre) => (
            <SelectItem key={genre} value={genre} />
          ))}
        </Select>
      )}
    </Row>
  );
}
