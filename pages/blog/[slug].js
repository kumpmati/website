import BlogPostTemplate from "../../components/template/SingleBlogPostTemplate";
import DefaultLayout from "../../components/module/Body/Default";
import DefaultHeader from "../../components/module/Header";
import { transformBlogPostData } from "../../services/transform";
import { getBlogPostBySlug } from "../../services/contentful/util";

export default BlogPostTemplate;
BlogPostTemplate.Header = DefaultHeader;
BlogPostTemplate.Layout = DefaultLayout;

export async function getServerSideProps({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  return transformBlogPostData({ post });
}
