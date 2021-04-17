import { getEntry } from "../services/contentful/util";
import { ENTRIES } from "../constants/entries";
import HomePage from "../components/HomePage/HomePage";

export default HomePage;

export async function getStaticProps() {
  const content = await getEntry(ENTRIES.HOME_PAGE);
  return {
    props: { content },
  };
}
