import { FC } from "react";
import { Entry, EntryCollection } from "contentful";
import { animated, useTrail } from "react-spring";
import defaultListRenderer from "./renderer";

import css from "./List.module.css";

const List: FC<PropsI> = ({ collection, renderer, delay, grid }) => {
  const trail = useTrail(collection.items.length, {
    config: { mass: 1, friction: 10, tension: 75 },
    from: { opacity: 0, transform: "translateY(-0.75rem)" },
    to: { opacity: 1, transform: "translateY(0rem)" },
    delay,
  });

  return (
    <ul className={`${css.list} ${grid ? css["list--grid"] : ""}`}>
      {trail.map((props, i) => {
        const item = collection.items[i];
        return (
          <animated.li key={item.sys.id} style={props}>
            {!!renderer ? renderer(item) : defaultListRenderer(item)}
          </animated.li>
        );
      })}
    </ul>
  );
};

export default List;

interface PropsI {
  collection: EntryCollection<any>;
  renderer?: (entry: Entry<any>, index?: number, arr?: Entry<any>[]) => JSX.Element;

  delay?: number;
  grid?: boolean;
}
