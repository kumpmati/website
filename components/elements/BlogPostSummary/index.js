import Link from "next/link";
import styles from "../../../styles/BlogPostSummary.module.css";

const BlogPostSummary = ({ data }) => {
  const { title, description, slug } = data.fields;

  return (
    <li className={styles.container}>
      <Link href={"/blog/" + slug}>
        <a className={styles.title}>
          <h2 className="post-title">{title}</h2>
        </a>
      </Link>
      <p className={styles.description}>{description}</p>
    </li>
  );
};

export default BlogPostSummary;
