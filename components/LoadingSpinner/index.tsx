import { FC, useEffect, useState } from "react";

import css from "./LoadingSpinner.module.css";

const LoadingSpinner: FC<PropsI> = ({ show }) => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setNum((prev) => (prev + 1) % 4), 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${css.loader} ${show ? css["loader--visible"] : ""}`}>
      <p className={css.loader__text}>loading{".".repeat(num)}</p>
    </div>
  );
};

export default LoadingSpinner;

interface PropsI {
  show?: boolean;
}
