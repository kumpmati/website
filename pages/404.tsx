import Section from "@components/Section/Section";
import NavigationLink from "@components/NavigationLink";
import Page from "@components/Page/Page";
import Link from "next/link";

const NotFound = () => {
  return (
    <Page title="MK | 404" noNav>
      <Section>
        <h3>404</h3>
        <p>Page not found</p>
      </Section>

      <NavigationLink text="Home" url="/" />
    </Page>
  );
};

export default NotFound;
