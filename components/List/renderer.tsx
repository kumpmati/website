import BlogPostListItem from "@components/BlogPostListItem";
import ProjectListItem from "@components/ProjectListItem";
import { isBlogPost, isMarkdownContent, isProject } from "@type/guards";
import { Entry } from "contentful";

const defaultListRenderer = (entry: Entry<any>) => {
  if (isBlogPost(entry))
    return <BlogPostListItem key={entry.sys.id} entry={entry} />;

  if (isProject(entry))
    return <ProjectListItem key={entry.sys.id} entry={entry} />;

  if (isMarkdownContent(entry)) return null;
};

export default defaultListRenderer;
