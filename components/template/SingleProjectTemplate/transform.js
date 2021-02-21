export const transformProjectStaticPaths = ({ projects }) => {
  return {
    paths: projects.items.map(project => ({
      params: { slug: project.fields.slug },
    })),
    fallback: true,
  };
};

export const transformProjectStaticProps = ({ project }) => {
  return {
    props: {
      project: project.items.length > 0 ? project.items[0].fields : {},
    },
  };
};
