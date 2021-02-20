import { renderRichText } from "./render";
import PageNotFoundTemplate from "../PageNotFoundTemplate";

const SingleBlogPost = ({ content }) => {
  const { title, description, published, content: body } = content;

  if (!title) return <PageNotFoundTemplate />;

  return (
    <article>
      <section>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{new Date(published).toDateString()}</p>
      </section>
      <section>{renderRichText(body)}</section>
    </article>
  );
};

export default SingleBlogPost;
