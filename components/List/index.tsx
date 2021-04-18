import { FC } from "react";
import { Entry, EntryCollection } from "contentful";

import css from "./List.module.css";
import defaultListRenderer from "./renderer";

const List: FC<ListProps> = ({ collection, renderer }) => {
  return (
    <ul className={css.list}>
      {collection.items.map(renderer ?? defaultListRenderer)}
    </ul>
  );
};

export default List;

export interface ListProps {
  collection: EntryCollection<any>;
  renderer?: (entry: Entry<any>) => JSX.Element;
}
