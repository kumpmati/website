export const transformContactPageProps = ({ content }) => {
  return {
    props: {
      content: content && content.fields,
    },
  };
};
