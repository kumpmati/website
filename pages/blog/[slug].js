import {
  getBlogPostBySlug,
  getEntriesOfType,
} from "../../services/contentful/util";
import {
  transformBlogPostData,
  transformBlogStaticPaths,
} from "../../services/transform";

import BlogPostTemplate from "../../components/template/SingleBlogPostTemplate";
import DefaultLayout from "../../components/module/Body/Default";
import DefaultHeader from "../../components/module/Header";

export default BlogPostTemplate;
BlogPostTemplate.Header = DefaultHeader;
BlogPostTemplate.Layout = DefaultLayout;

/**
 * Fetch all available blog posts
 * @param {*} ctx
 */
export async function getStaticPaths(ctx) {
  const posts = await getEntriesOfType("blogPost");
  return transformBlogStaticPaths(posts);
}

export async function getStaticProps({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  return transformBlogPostData({ post });
}
