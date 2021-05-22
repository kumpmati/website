import AlbumListItem from "@components/List/AlbumListItem";
import BlogPostListItem from "@components/List/BlogPostListItem";
import ProjectListItem from "@components/List/ProjectListItem";
import { isAlbum, isBlogPost, isProject, isSong } from "@type/guards";
import { Entry } from "contentful";
import SongListItem from "./SongListItem";

const defaultListRenderer = (entry: Entry<any>) => {
  if (isBlogPost(entry)) return <BlogPostListItem entry={entry} />;
  if (isProject(entry)) return <ProjectListItem entry={entry} />;
  if (isAlbum(entry)) return <AlbumListItem entry={entry} />;
  if (isSong(entry)) return <SongListItem entry={entry} />;
  return null;
};

export default defaultListRenderer;
