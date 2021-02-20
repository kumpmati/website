import { renderRichText } from "./render";

const BlogPost = ({ content }) => {
  const { title, description, published } = content;

  return (
    <article>
      <section>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{new Date(published).toDateString()}</p>
      </section>
      <section>{renderRichText(content.content)}</section>
    </article>
  );
};

export default BlogPost;
