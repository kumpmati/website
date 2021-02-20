import Link from "next/link";
import styles from "../../../../styles/Navigation.module.css";

const NavigationLink = ({ data, path }) => {
  const { text, url, strict } = data.fields;
  const active = strict ? path === url : path.includes(url);

  return (
    <li className={`${styles.link} ${active ? styles.active : ""}`}>
      <Link href={url}>{text}</Link>
    </li>
  );
};

export default NavigationLink;
