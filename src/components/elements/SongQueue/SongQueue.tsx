import { useSongLibraryDataContext } from "src/features/SongLibrary/DataContext/SongLibraryDataContext";
import { Button, Column, Row } from "@chems/atoms";
import { RemoveSquareIcon } from "src/components/Icons/RemoveSquareIcon";
import { toMinutes } from "@utils/toMinutes";
import { queueColumn, queuedItem } from "./SongQueue.css";
import { Dialog } from "src/components/atoms/Dialog/Dialog";
import { useState } from "react";
import type { Song } from "@api/service";

interface QueueItem {
  song: Song;
  index: number;
}

export function SongQueue() {
  const { queue, removeFromQueue } = useSongLibraryDataContext();
  const [itemToRemove, setItemToRemove] = useState<QueueItem | null>(null);

  const handleRemoveClick = (item: QueueItem) => {
    setItemToRemove(item);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeFromQueue({
        songId: itemToRemove.song.id,
        queueIndex: itemToRemove.index,
      });
      setItemToRemove(null);
    }
  };

  return (
    <Column styles={[queueColumn]}>
      <h2>Song Queue</h2>
      {!queue.length ? (
        <p>No songs in queue</p>
      ) : (
        queue.map((song, index) => (
          <Row key={song.id} styles={[queuedItem]}>
            <Column>
              <p>{song.title}</p>
              <p>
                {song.artist} • {toMinutes(song.duration)}
              </p>
            </Column>
            <Button onClick={() => handleRemoveClick({ song, index })}>
              <RemoveSquareIcon width="1.5rem" height="1.5rem" />
            </Button>
          </Row>
        ))
      )}

      <Dialog
        isOpen={!!itemToRemove}
        onOpenChange={(isOpen) => !isOpen && setItemToRemove(null)}
        title="Remove from Queue"
        message={
          itemToRemove
            ? `Are you sure you want to remove "${itemToRemove.song.title}" by ${itemToRemove.song.artist}?`
            : ""
        }
        onConfirm={handleConfirmRemove}
        onCancel={() => setItemToRemove(null)}
      />
    </Column>
  );
}
