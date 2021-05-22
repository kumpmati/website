import { FC } from "react";
import { CTSong } from "@type/content";
import { Entry } from "contentful";

import css from "./SongListItem.module.css";

const SongListItem: FC<PropsI> = ({ entry }) => {
  const { title } = entry.fields;

  return <p className={css.song__title}>{title}</p>;
};

export default SongListItem;

interface PropsI {
  entry: Entry<CTSong>;
}
