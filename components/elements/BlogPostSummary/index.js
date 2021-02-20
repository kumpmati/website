import Link from "next/link";

const BlogPostSummary = ({ data }) => {
  const { title, description, slug } = data.fields;

  return (
    <article className="blog-post-summary">
      <Link href={"/blog/" + slug}>
        <a>
          <h1 className="post-title">{title}</h1>
        </a>
      </Link>
      <p className="post-description">{description}</p>
    </article>
  );
};

export default BlogPostSummary;
