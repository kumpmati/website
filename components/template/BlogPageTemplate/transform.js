export const transformBlogSummaryData = ({ content, posts }) => {
  return {
    props: {
      content: content && content.fields,
      posts: posts.total > 0 ? posts.items : [],
    },
  };
};
