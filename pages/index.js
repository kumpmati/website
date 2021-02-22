import { getEntry } from "../services/contentful/util";
import { ENTRIES } from "../constants/entries";

import HomePageTemplate from "../components/template/HomePageTemplate";
import { transformHomePageData } from "../components/template/HomePageTemplate/transform";

import DefaultLayout from "../components/module/Body/Default";
import DefaultHeader from "../components/module/Header";

export default HomePageTemplate;
HomePageTemplate.Header = DefaultHeader;
HomePageTemplate.Layout = DefaultLayout;

export async function getStaticProps(ctx) {
  const content = await getEntry(ENTRIES.HOME_PAGE);
  return transformHomePageData({ content });
}
