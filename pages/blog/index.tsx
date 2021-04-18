import BlogPage, { BlogPageProps } from "@components/BlogPage";
import { ENTRIES } from "@constants/entries";
import { getEntriesOfType, getEntry } from "@services/contentful/util";

export default BlogPage;

export async function getStaticProps() {
  const props: BlogPageProps = {
    markdown: await getEntry(ENTRIES.BLOG_PAGE),
    posts: await getEntriesOfType("blogPost"),
  };

  return {
    props,
  };
}
