import BlogPage, { BlogPageProps } from "../../components/BlogPage/BlogPage";
import { ENTRIES } from "../../constants/entries";
import { getEntry } from "../../services/contentful/util";

export default BlogPage;

export async function getStaticProps() {
  const markdown = await getEntry(ENTRIES.BLOG_PAGE);

  const props: BlogPageProps = {
    markdown,
    posts: [],
  };

  return {
    props,
  };
}
