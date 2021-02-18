import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  getBlogPostBySlug,
  getEntriesOfType,
} from "../../services/contentful/util";
import {
  transformBlogPostData,
  transformBlogStaticPaths,
} from "../../services/transform";

const BlogPost = ({ content }) => {
  const { title } = content;

  return (
    <div>
      <h1>{title}</h1>
      <section>{documentToReactComponents(content.content)}</section>
    </div>
  );
};

export default BlogPost;

export async function getStaticPaths(ctx) {
  const posts = await getEntriesOfType("blogPost");
  return transformBlogStaticPaths(posts);
}

export async function getStaticProps({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  return transformBlogPostData({ post });
}
