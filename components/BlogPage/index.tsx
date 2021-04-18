import { FC } from "react";
import { CTBlogPost, CTMarkdownContent } from "@type/content";
import Header from "../Header/Header";
import MarkdownContent from "../MarkdownContent";
import Page from "../Page/Page";
import { Entry, EntryCollection } from "contentful";

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
  markdown: Entry<CTMarkdownContent>;
  posts: EntryCollection<CTBlogPost>;
}
