import { FC } from "react";
import { Entry, EntryCollection } from "contentful";
import { animated, useTrail } from "react-spring";
import defaultListRenderer from "./renderer";

import css from "./List.module.css";

const List: FC<ListProps> = ({ collection, renderer, delay }) => {
  const trail = useTrail(collection.items.length, {
    config: { mass: 1, friction: 10, tension: 75 },
    from: { opacity: 0, transform: "translateY(-0.75rem)" },
    to: { opacity: 1, transform: "translateY(0rem)" },

    delay,
  });

  return (
    <ul className={css.list}>
      {trail.map((props, i) => {
        const item = collection.items[i];
        return (
          <animated.li style={props}>
            {!!renderer ? renderer(item) : defaultListRenderer(item)}
          </animated.li>
        );
      })}
    </ul>
  );
};

export default List;

export interface ListProps {
  collection: EntryCollection<any>;
  renderer?: (
    entry: Entry<any>,
    index?: number,
    arr?: Entry<any>[]
  ) => JSX.Element;

  delay?: number;
}
