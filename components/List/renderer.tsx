import BlogPostListItem from "@components/BlogPostListItem";
import ProjectListItem from "@components/ProjectListItem";
import { isBlogPost, isProject } from "@type/guards";
import { Entry } from "contentful";

const defaultListRenderer = (entry: Entry<any>) => {
  if (isBlogPost(entry)) return <BlogPostListItem entry={entry} />;
  if (isProject(entry)) return <ProjectListItem entry={entry} />;
  return null;
};

export default defaultListRenderer;
