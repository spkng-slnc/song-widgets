import { useSongLibraryDataContext } from "../../features/SongLibrary/DataContext/SongLibraryDataContext";
import { Button, Column, Row } from "@ui";
import { RemoveSquareIcon } from "../Icons/RemoveSquareIcon";
import { toMinutes } from "@utils/toMinutes";
import { queueColumn, queuedItem } from "./SongQueue.css";
import { Dialog } from "../Dialog/Dialog";
import { useState } from "react";

export function SongQueue() {
  const { queue, removeFromQueue } = useSongLibraryDataContext();
  const [songToRemove, setSongToRemove] = useState<string | null>(null);

  const handleRemoveClick = (songId: string) => {
    setSongToRemove(songId);
  };

  const handleConfirmRemove = () => {
    if (songToRemove) {
      removeFromQueue(songToRemove);
      setSongToRemove(null);
    }
  };

  const songToRemoveDetails = queue.find(song => song.id === songToRemove);

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
            <Button onClick={() => handleRemoveClick(song.id)}>
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
          songToRemoveDetails
            ? `Are you sure you want to remove "${songToRemoveDetails.title}" by ${songToRemoveDetails.artist}?`
            : ""
        }
        onConfirm={handleConfirmRemove}
        onCancel={() => setSongToRemove(null)}
      />
    </Column>
  );
}
