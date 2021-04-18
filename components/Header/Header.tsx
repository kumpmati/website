import css from "./Header.module.css";

const Header = ({ children }) => {
  return <header className={css.header}>{children}</header>;
};

export default Header;
