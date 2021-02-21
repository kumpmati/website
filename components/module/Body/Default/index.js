import styles from "../../../../styles/DefaultLayout.module.css";

const DefaultLayout = ({ children }) => {
  return <main id={styles.main}>{children}</main>;
};

export default DefaultLayout;
