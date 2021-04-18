import { getEntry } from "../services/contentful/util";
import { ENTRIES } from "../constants/entries";
import Page from "@components/Page/Page";

const HomePage = ({ content }) => {
  return <Page title="MK" />;
};

export default HomePage;

export async function getStaticProps() {
  const content = await getEntry(ENTRIES.HOME_PAGE);
  return {
    props: { content },
  };
}
