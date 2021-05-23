import { FC, useContext } from "react";
import { CTSong } from "@type/content";
import { Entry } from "contentful";

import css from "./SongListItem.module.css";
import { AudioPlayerContext } from "@components/AudioPlayer";

const SongListItem: FC<PropsI> = ({ entry }) => {
  const { load } = useContext(AudioPlayerContext);
  const { title, audioFile } = entry.fields;

  return (
    <div className={css.song}>
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
