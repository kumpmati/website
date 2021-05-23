import { FC, useContext } from "react";
import { CTSong } from "@type/content";
import { Entry } from "contentful";

import css from "./SongListItem.module.css";
import { AudioPlayerContext } from "@components/AudioPlayer";

const SongListItem: FC<PropsI> = ({ entry }) => {
  const { load, currentSong } = useContext(AudioPlayerContext);
  const { title, audioFile } = entry.fields;

  const isCurrentSong = currentSong?.sys.id === entry?.sys.id;

  return (
    <div className={`${css.song} ${isCurrentSong ? css["song--current"] : ""}`}>
      <button
        onClick={() => (audioFile ? load(entry, true) : null)}
        className={`${css.song__title} ${audioFile ? css["song__title--playable"] : ""}`}>
        {title}
      </button>
    </div>
  );
};

export default SongListItem;

interface PropsI {
  entry: Entry<CTSong>;
}
