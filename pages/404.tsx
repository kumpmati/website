import Header from "@components/Header/Header";
import NavigationLink from "@components/NavigationLink";
import Page from "@components/Page/Page";
import Link from "next/link";

const NotFound = () => {
  return (
    <Page title="MK | 404" noNav>
      <Header>
        <h3>404</h3>
        <p>Page not found</p>
      </Header>

      <NavigationLink text="Home" url="/" />
    </Page>
  );
};

export default NotFound;
