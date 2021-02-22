import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../../../util/hooks";
import { getNavigation } from "../../../services/contentful/util";

import MobileNavigation from "./MobileNavigation";

import styles from "../../../styles/Navigation/Navigation.module.css";

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
      <div className="reveal delay-250ms">
        <MobileNavigation links={links} path={path} />
      </div>
    </nav>
  );
};

export default Navigation;
