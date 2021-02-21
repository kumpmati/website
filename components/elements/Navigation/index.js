import { v4 } from "uuid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNavigation } from "../../../services/contentful/util";
import styles from "../../../styles/Navigation.module.css";

import NavigationLink from "./NavigationLink";

const Navigation = () => {
  const [links, setLinks] = useState([]);
  const path = useRouter().asPath;

  useEffect(() => {
    (async () => {
      const nav = await getNavigation();
      setLinks(nav.fields.links);
    })();
  }, []);

  return (
    <nav id={styles.nav}>
      <ul id={styles.links}>
        {links &&
          links.map(link => (
            <NavigationLink key={v4()} data={link} path={path} />
          ))}
      </ul>
    </nav>
  );
};

export default Navigation;
