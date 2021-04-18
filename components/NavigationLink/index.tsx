import Link from "next/link";
import { FC } from "react";

import css from "./NavigationLink.module.css";

const NavigationLink: FC<NavigationLinkProps> = ({ text, url, active }) => {
  return (
    <Link href={url}>
      <a className={`${css.link} ${active ? css["link--active"] : ""}`}>
        {text}
      </a>
    </Link>
  );
};

export default NavigationLink;

export interface NavigationLinkProps {
  text: string;
  url: string;
  active?: boolean;
}
