import { FC } from "react";
import { CTBlogPost, CTMarkdownContent } from "@type/content";
import Header from "../Header/Header";
import MarkdownContent from "../MarkdownContent";
import Page from "../Page/Page";
import { Entry, EntryCollection } from "contentful";
import List from "@components/List";

const BlogPage: FC<BlogPageProps> = ({ markdown, posts }) => {
  const { title, markdownContent } = markdown.fields;

  return (
    <Page title={"MK | " + title}>
      <Header>
        <h3>Blog</h3>
        <MarkdownContent content={markdownContent} />
      </Header>

      <List collection={posts} />
    </Page>
  );
};

export default BlogPage;

export interface BlogPageProps {
  markdown: Entry<CTMarkdownContent>;
  posts: EntryCollection<CTBlogPost>;
}
