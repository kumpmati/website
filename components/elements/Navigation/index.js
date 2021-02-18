import { v4 } from "uuid";
import NavigationLink from "../NavigationLink";

/**
 * Renders the page's main navigation bar
 */
const Navigation = ({ data }) => {
  const { links } = data;

  return (
    <nav>
      <ul id="nav-links">
        {links && links.map(link => <NavigationLink key={v4()} data={link} />)}
      </ul>
    </nav>
  );
};

export default Navigation;
