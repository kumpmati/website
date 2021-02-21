import {
  getBlogPostBySlug,
  getEntriesOfType,
} from "../../services/contentful/util";

import BlogPostTemplate from "../../components/template/SingleBlogPostTemplate";
import {
  transformBlogPostData,
  transformBlogPostStaticPaths,
} from "../../components/template/SingleBlogPostTemplate/transform";

import DefaultLayout from "../../components/module/Body/Default";
import DefaultHeader from "../../components/module/Header";

export default BlogPostTemplate;
BlogPostTemplate.Header = DefaultHeader;
BlogPostTemplate.Layout = DefaultLayout;

export async function getStaticPaths() {
  const posts = await getEntriesOfType("blogPost");
  return transformBlogPostStaticPaths({ posts });
}

export async function getStaticProps({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (post.items.length === 0) {
    return {
      notFound: true,
    };
  }

  return transformBlogPostData({ post });
}
