const BlogPostSummary = ({ data }) => {
  const { content, title, description } = data.fields;
  return (
    <article>
      <h1 className="blog-post-title">{title}</h1>
      <p className="blog-post-description">{description}</p>
    </article>
  );
};

export default BlogPostSummary;
