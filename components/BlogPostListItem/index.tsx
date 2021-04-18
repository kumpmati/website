import { FC } from "react";
import { CTBlogPost } from "@type/content";
import { Entry } from "contentful";
import Link from "next/link";

import css from "./BlogPostListItem.module.css";

const BlogPostListItem: FC<BlogPostListItemProps> = ({ entry }) => {
  const { title, summary, slug } = entry.fields;
  const createDate = new Date(entry.sys.createdAt).toLocaleDateString();

  return (
    <Link href={`/blog/${slug}`}>
      <a className={css.post}>
        <div>
          <p className={css.post__title}>{title}</p>
          <p className={css.post__summary}>{summary}</p>
        </div>
        <div>
          <p className={css.post__created}>{createDate}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostListItem;

export interface BlogPostListItemProps {
  entry: Entry<CTBlogPost>;
}
