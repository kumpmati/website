import { ENTRIES } from "@constants/entries";
import { getEntriesOfType, getEntry } from "@services/contentful/util";

import { FC } from "react";
import { CTBlogPost, CTMarkdownContent } from "@type/content";
import Header from "@components/Header/Header";
import MarkdownContent from "@components/MarkdownContent";
import Page from "@components/Page/Page";
import { Entry, EntryCollection } from "contentful";
import List from "@components/List";

const BlogPage: FC<BlogPageProps> = ({ markdown, posts }) => {
  const { title, markdownContent } = markdown.fields;

  return (
    <Page title={"MK | " + title}>
      <Header delay={500}>
        <h3>Blog</h3>
        <MarkdownContent content={markdownContent} />
      </Header>

      <List collection={posts} delay={750} />
    </Page>
  );
};

export default BlogPage;

export interface BlogPageProps {
  markdown: Entry<CTMarkdownContent>;
  posts: EntryCollection<CTBlogPost>;
}

export async function getStaticProps() {
  const props: BlogPageProps = {
    markdown: await getEntry(ENTRIES.BLOG_PAGE),
    posts: await getEntriesOfType("blogPost"),
  };

  return {
    props,
  };
}
