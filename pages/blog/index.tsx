import { ENTRIES } from "@constants/entries";
import { getEntriesOfType, getEntry } from "@services/contentful/util";

import { FC } from "react";
import { CTBlogPost, CTMarkdownContent } from "@type/content";
import Section from "@components/Section/Section";
import MarkdownContent from "@components/MarkdownContent";
import Page from "@components/Page/Page";
import { Entry, EntryCollection } from "contentful";
import List from "@components/List";

const BlogPage: FC<BlogPageProps> = ({ markdown, posts }) => {
  const { title, markdownContent } = markdown.fields;

  return (
    <Page title={"MK | " + title}>
      <Section delay={500}>
        <h1>Blog</h1>
        <MarkdownContent content={markdownContent} />
      </Section>

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
    revalidate: 10 * 60, // refresh list every 10 minutes
  };
}
