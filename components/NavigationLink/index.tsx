import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useLoadingState } from "util/hooks";

import css from "./NavigationLink.module.css";

const NavigationLink: FC<PropsI> = ({ text, url, active }) => {
  const { loading } = useLoadingState();
  const [clicked, setClicked] = useState(false);

  useEffect(() => clicked && setClicked(loading), [loading]);

  return (
    <Link href={url}>
      <a
        onClick={() => setClicked(true)}
        className={`${css.link} ${active ? css["link--active"] : ""} ${
          clicked ? css["link--loading"] : ""
        }`}>
        {text}
      </a>
    </Link>
  );
};

export default NavigationLink;

interface PropsI {
  text: string;
  url: string;
  active?: boolean;
}
