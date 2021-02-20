import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { v4 } from "uuid";

import BlogPostSummary from "../../elements/BlogPostSummary";

const BlogTemplate = ({ content, posts }) => {
  const { title, description } = content;

  return (
    <main>
      <section>
        <h1 id="blog-title">{title}</h1>
        <div id="blog-description">
          {documentToReactComponents(description)}
        </div>
      </section>
      <section>
        {posts && posts.map(post => <BlogPostSummary data={post} key={v4()} />)}
      </section>
    </main>
  );
};

export default BlogTemplate;
