/**
 * Transforms the raw data from contentful into useful props for HomePageTemplate
 * @param {*} raw
 */
export const transformHomePageData = ({ content }) => {
  return {
    props: {
      content: content && content.fields,
    },
  };
};

export const transformBlogSummaryData = ({ content, posts }) => {
  return {
    props: {
      content: content && content.fields,
      posts: posts.total > 0 ? posts.items : [],
    },
  };
};

export const transformBlogPostData = ({ post }) => {
  return {
    props: {
      content: post.items.length > 0 ? post.items[0].fields : {},
    },
  };
};

export const transformProjectsPageData = ({ content, projects }) => {
  return {
    props: {
      content: content && content.fields,
      projects: projects.items.length > 0 ? projects.items : [],
    },
  };
};
