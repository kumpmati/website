import BlogTemplate from "../../components/templates/BlogTemplate";
import { getEntries, getEntry } from "../../services/contentful/util";
import { transformBlogSummaryData } from "../../services/transform";
import { entries } from "../../services/contentful/entries";

export default BlogTemplate;

export async function getServerSideProps(ctx) {
  const navigation = await getEntry(entries.navigation);
  const content = await getEntry(entries.blogPage);
  const posts = await getEntries({ content_type: "blogPost" });

  return transformBlogSummaryData({ content, navigation, posts });
}
