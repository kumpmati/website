import { FC } from "react";
import { MarkdownPage } from "../../types/contentful";
import Header from "../Header/Header";
import MarkdownContent from "../MarkdownContent/MarkdownContent";
import Page from "../Page/Page";

const BlogPage: FC<BlogPageProps> = ({ markdown, posts }) => {
  const { title, markdownContent } = markdown.fields;

  return (
    <Page title={"MK | " + title}>
      <Header>
        <h1>Blog</h1>
      </Header>
      <MarkdownContent content={markdownContent} />
    </Page>
  );
};

export default BlogPage;

export interface BlogPageProps {
  markdown: MarkdownPage;
  posts: any[];
}
