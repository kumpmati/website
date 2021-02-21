export const transformBlogPostData = ({ post }) => {
  return {
    props: {
      content: post.items.length > 0 ? post.items[0].fields : {},
    },
    revalidate: 30,
  };
};

export const transformBlogPostStaticPaths = ({ posts }) => {
  return {
    paths: posts.items.map(post => ({ params: { slug: post.fields.slug } })),
    fallback: true,
  };
};
