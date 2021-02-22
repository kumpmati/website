import Link from "next/link";
import { useState } from "react";

const NavigationLink = ({ data, path, styles, onClick }) => {
  const { text, url, strict } = data.fields;
  const active = strict ? path === url : path.includes(url);

  const [clicked, setClicked] = useState(false);

  return (
    <li
      className={`${styles.link} ${active ? styles.active : ""} ${
        clicked ? styles.clicked : ""
      }`}>
      <Link href={url}>
        <a
          onClick={() => {
            setClicked(true);
            if (typeof onClick === "function") onClick(data);
          }}>
          {text}
        </a>
      </Link>
    </li>
  );
};

export default NavigationLink;
