import { useSongLibraryDataContext } from "src/features/SongLibrary/DataContext/SongLibraryDataContext";
import { Button, Column, Row } from "@chems/atoms";
import { RemoveSquareIcon } from "src/components/Icons/RemoveSquareIcon";
import { toMinutes } from "@utils/toMinutes";
import { queueColumn, queuedItem } from "./SongQueue.css";
import { Dialog } from "src/components/atoms/Dialog/Dialog";
import { useState } from "react";
import type { Song } from "@api/*";

export function SongQueue() {
  const { queue, removeFromQueue } = useSongLibraryDataContext();
  const [songToRemove, setSongToRemove] = useState<Song | null>(null);

  const handleRemoveClick = (song: Song) => {
    setSongToRemove(song);
  };

  const handleConfirmRemove = () => {
    if (songToRemove) {
      removeFromQueue(songToRemove.id);
      setSongToRemove(null);
    }
  };

  return (
    <Column styles={[queueColumn]}>
      <h2>Song Queue</h2>
      {!queue.length ? (
        <p>No songs in queue</p>
      ) : (
        queue.map((song) => (
          <Row key={song.id} styles={[queuedItem]}>
            <Column>
              <p>{song.title}</p>
              <p>
                {song.artist} • {toMinutes(song.duration)}
              </p>
            </Column>
            <Button onClick={() => handleRemoveClick(song)}>
              <RemoveSquareIcon width="1.5rem" height="1.5rem" />
            </Button>
          </Row>
        ))
      )}

      <Dialog
        isOpen={!!songToRemove}
        onOpenChange={(isOpen) => !isOpen && setSongToRemove(null)}
        title="Remove from Queue"
        message={
          songToRemove
            ? `Are you sure you want to remove "${songToRemove.title}" by ${songToRemove.artist}?`
            : ""
        }
        onConfirm={handleConfirmRemove}
        onCancel={() => setSongToRemove(null)}
      />
    </Column>
  );
}
