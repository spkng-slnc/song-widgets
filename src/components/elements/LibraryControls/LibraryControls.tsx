import {
  controlRow,
  item,
  itemIndicator,
  itemIndicatorIcon,
  itemText,
  list,
  popup,
  positioner,
  scrollArrow,
  select,
  selectIcon,
} from "./LibraryControls.css";
import { Input, Select } from "@base-ui-components/react";
import { Row } from "@ui";
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
        <Select.Root value={selectedGenre} onValueChange={handleSelectGenre}>
          <Select.Trigger className={select}>
            {selectedGenre ? <Select.Value /> : "Filter By Genre"}
            <Select.Icon className={selectIcon}>
              <ChevronUpDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner className={positioner} sideOffset={8}>
              <Select.Popup className={popup}>
                <Select.ScrollUpArrow className={scrollArrow} />
                <Select.List className={list}>
                  <Select.Item value={null} className={item}>
                    <Select.ItemIndicator className={itemIndicator}>
                      <CheckIcon className={itemIndicatorIcon} />
                    </Select.ItemIndicator>
                    <Select.ItemText className={itemText}>
                      All Genres
                    </Select.ItemText>
                  </Select.Item>
                  {songs.metaData.genres.map((genre) => (
                    <Select.Item key={genre} value={genre} className={item}>
                      <Select.ItemIndicator className={itemIndicator}>
                        <CheckIcon className={itemIndicatorIcon} />
                      </Select.ItemIndicator>
                      <Select.ItemText className={itemText}>
                        {genre}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.List>
                <Select.ScrollDownArrow className={scrollArrow} />
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      )}
    </Row>
  );
}

function ChevronUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}>
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
