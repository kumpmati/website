import { FC, useContext } from "react";
import { CTSong } from "@type/content";
import { Entry } from "contentful";

import css from "./SongListItem.module.css";
import { AudioPlayerContext } from "@components/AudioPlayer";

const SongListItem: FC<PropsI> = ({ entry }) => {
  const { load, currentSong, playing } = useContext(AudioPlayerContext);
  const { title, audioFile } = entry.fields;

  const isCurrentSong = currentSong?.sys.id === entry?.sys.id;

  const loadSong = () => {
    if (!audioFile) return;
    load(entry, true);
  };

  return (
    <div className={`${css.song} ${isCurrentSong ? css["song--current"] : ""}`}>
      <button
        onClick={loadSong}
        className={`${css.song__title} ${audioFile ? css["song__title--playable"] : ""}`}>
        {title}
        {isCurrentSong && (playing ? " - playing" : " - paused")}
      </button>
    </div>
  );
};

export default SongListItem;

interface PropsI {
  entry: Entry<CTSong>;
}
