import Link from "next/link";

const BlogPostSummary = ({ data }) => {
  const { title, description, slug } = data.fields;

  return (
    <li className="blog-post-summary">
      <Link href={"/blog/" + slug}>
        <a>
          <h2 className="post-title">{title}</h2>
        </a>
      </Link>
      <p className="post-description">{description}</p>
    </li>
  );
};

export default BlogPostSummary;
