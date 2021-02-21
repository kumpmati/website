import Link from "next/link";
import { useState } from "react";
import styles from "../../../../styles/Navigation.module.css";

const NavigationLink = ({ data, path }) => {
  const { text, url, strict } = data.fields;
  const active = strict ? path === url : path.includes(url);

  const [clicked, setClicked] = useState(false);

  return (
    <li
      className={`${styles.link} ${active ? styles.active : ""} ${
        clicked ? styles.clicked : ""
      }`}>
      <Link href={url}>
        <a onClick={() => setClicked(true)}>{text}</a>
      </Link>
    </li>
  );
};

export default NavigationLink;
