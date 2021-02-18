import HomePageTemplate from "../components/templates/HomePageTemplate";
import { getEntry } from "../services/contentful/util";
import { transformHomePageData } from "../services/transform";
import { entries } from "../services/contentful/entries";

export default HomePageTemplate;

export async function getStaticProps(ctx) {
  const navigation = await getEntry(entries.navigation);
  const content = await getEntry(entries.homePage);

  return transformHomePageData({ content, navigation });
}
