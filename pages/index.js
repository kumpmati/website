import { getEntry } from "../services/contentful/util";
import { transformHomePageData } from "../services/transform";
import { entries } from "../services/contentful/entries";

import HomePageTemplate from "../components/template/HomePageTemplate";
import DefaultLayout from "../components/module/Body/Default";
import DefaultHeader from "../components/module/Header";

export default HomePageTemplate;
HomePageTemplate.Header = DefaultHeader;
HomePageTemplate.Layout = DefaultLayout;

export async function getStaticProps(ctx) {
  const content = await getEntry(entries.homePage);
  return transformHomePageData({ content });
}
