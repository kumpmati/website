export const transformProjectsPageData = ({ content, projects }) => {
  return {
    props: {
      content: content && content.fields,
      projects: projects.items.length > 0 ? projects.items : [],
    },
  };
};
