import { v4 } from "uuid";
import { useState } from "react";

import NavigationLink from "../NavigationLink";
import MenuIcon from "./MenuIcon";

import styles from "../../../../styles/Navigation/MobileNavigation.module.css";

const MobileNavigation = ({ links, path }) => {
  const [visible, setVisible] = useState(false);

  const visibleClassName = visible ? styles.visible : "";
  return (
    <>
      <div id={styles.bg} className={visibleClassName}></div>
      <div id={styles.mobileNav}>
        <div id={styles.topBar}>
          <button
            aria-label="Toggle menu"
            id={styles.mobileButton}
            onClick={() => setVisible(v => !v)}
            className={visibleClassName}>
            <MenuIcon />
          </button>
          <h1 id={styles.title} className={visibleClassName}>
            MK
          </h1>
        </div>
        <ul id={styles.links} className={visibleClassName}>
          {links &&
            links.map(link => (
              <NavigationLink
                key={v4()}
                styles={styles}
                data={link}
                path={path}
                onClick={() => setVisible(false)}
              />
            ))}
        </ul>
      </div>
    </>
  );
};

export default MobileNavigation;
