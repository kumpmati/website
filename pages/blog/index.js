import { getEntries, getEntry } from "../../services/contentful/util";
import { transformBlogSummaryData } from "../../services/transform";
import { entries } from "../../services/contentful/entries";

import BlogTemplate from "../../components/template/BlogTemplate";
import DefaultLayout from "../../components/module/Body/Default";
import DefaultHeader from "../../components/module/Header";

export default BlogTemplate;
BlogTemplate.Header = DefaultHeader;
BlogTemplate.Layout = DefaultLayout;

export async function getServerSideProps(ctx) {
  const content = await getEntry(entries.blogPage);
  const posts = await getEntries({ content_type: "blogPost" });

  return transformBlogSummaryData({ content, posts });
}
