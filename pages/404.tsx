import Section from "@components/Section/Section";
import NavigationLink from "@components/NavigationLink";
import Page from "@components/Page/Page";

const NotFound = () => {
  return (
    <Page title="MK | 404" noNav>
      <Section>
        <h1>404</h1>
        <p>Page not found</p>
      </Section>

      <NavigationLink text="Home" url="/" />
    </Page>
  );
};

export default NotFound;
