import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { v4 } from "uuid";

import Head from "next/head";
import BlogPostSummary from "../../elements/BlogPostSummary";
import styles from "../../../styles/Blog.module.css";

const BlogTemplate = ({ content, posts }) => {
  const { title, description } = content;

  return (
    <>
      <Head>
        <title>Matias Kumpulainen | {title}</title>
      </Head>
      <section>
        <h1 className="page-title">{title}</h1>
        <div id={styles.content}>{documentToReactComponents(description)}</div>
      </section>
      <section>
        <ul id={styles.posts}>
          {posts &&
            posts.map(post => <BlogPostSummary data={post} key={v4()} />)}
        </ul>
      </section>
    </>
  );
};

export default BlogTemplate;
