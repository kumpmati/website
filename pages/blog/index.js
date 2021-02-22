import { getEntriesOfType, getEntry } from "../../services/contentful/util";
import { ENTRIES } from "../../constants/entries";

import BlogTemplate from "../../components/template/BlogPageTemplate";
import { transformBlogSummaryData } from "../../components/template/BlogPageTemplate/transform";

import DefaultLayout from "../../components/module/Body/Default";
import DefaultHeader from "../../components/module/Header";

export default BlogTemplate;
BlogTemplate.Header = DefaultHeader;
BlogTemplate.Layout = DefaultLayout;

export async function getServerSideProps(ctx) {
  const content = await getEntry(ENTRIES.BLOG_PAGE);
  const posts = await getEntriesOfType("blogPost");
  return transformBlogSummaryData({ content, posts });
}
