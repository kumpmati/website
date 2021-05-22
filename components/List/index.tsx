import { FC } from "react";
import { Entry, EntryCollection } from "contentful";
import defaultListRenderer from "./renderer";

import css from "./List.module.css";
import { motion } from "framer-motion";

const List: FC<PropsI> = ({ collection, delay, renderer, grid }) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", delay, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, transform: "translateY-0.75rem)" },
    visible: { opacity: 1, transform: "translateY(0rem)" },
  };

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={listVariants}
      className={`${css.list} ${grid ? css["list--grid"] : ""}`}>
      {collection?.map((item, i) => {
        return (
          <motion.li variants={itemVariants} key={item.sys.id}>
            {!!renderer ? renderer(item) : defaultListRenderer(item)}
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default List;

interface PropsI {
  collection: Entry<any>[];
  renderer?: (entry: Entry<any>, index?: number, arr?: Entry<any>[]) => JSX.Element;

  delay?: number;
  grid?: boolean;
}
