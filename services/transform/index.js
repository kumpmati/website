/**
 * Transforms the raw data from contentful into useful props for HomePageTemplate
 * @param {*} raw
 */
export const transformHomePageData = ({ content, navigation }) => {
  return {
    props: {
      content: content && content.fields,
      navigation: navigation && navigation.fields,
    },
  };
};

export const transformBlogSummaryData = ({ content, navigation, posts }) => {
  return {
    props: {
      content: content && content.fields,
      navigation: navigation && navigation.fields,
      posts: posts.total > 0 ? posts.items : [],
    },
  };
};

export const transformBlogPostData = ({ post }) => {
  return {
    props: {
      content: post.items[0].fields,
    },
  };
};

export const transformBlogStaticPaths = posts => {
  return {
    paths: posts.items.map(post => `/blog/${post.fields.slug}`),
    fallback: true,
  };
};
